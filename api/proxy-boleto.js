export default async function handler(req, res) {
  const { target: queryTarget } = req.query;
  const targetCookieName = 'proxy-target-host';
  const proxyPath = '/api/proxy-boleto';
  
  let targetBase = '';

  // 1. Identificar o Target Host (DDNS)
  if (queryTarget) {
    try {
      const urlObj = new URL(queryTarget);
      // Remove o arquivo (se houver) e mantém apenas o diretório base
      const lastSlash = urlObj.pathname.lastIndexOf('/');
      const basePath = urlObj.pathname.substring(0, lastSlash + 1);
      targetBase = `${urlObj.protocol}//${urlObj.host}${basePath}`;
      
      // Salva o host no cookie para requisições subsequentes de assets
      res.setHeader('Set-Cookie', [
        `${targetCookieName}=${encodeURIComponent(targetBase)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`
      ]);
    } catch (e) {
      console.error('Invalid target URL:', queryTarget);
    }
  } else {
    const cookies = req.headers.cookie || '';
    const match = cookies.match(new RegExp('(^| )' + targetCookieName + '=([^;]+)'));
    if (match) {
      targetBase = decodeURIComponent(match[2]);
    }
  }

  if (!targetBase) {
    return res.status(400).send('URL de destino não encontrada. O proxy precisa ser iniciado com ?target=');
  }

  // 2. Determinar o sub-caminho solicitado
  // Ex: /api/proxy-boleto/uni-1.90/css/... -> /uni-1.90/css/...
  const fullUrl = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  let subPath = fullUrl.pathname.replace(proxyPath, '');
  if (!subPath.startsWith('/')) subPath = '/' + subPath;

  // Se houver queryTarget e for a página inicial, ignoramos o subPath
  let fetchUrl;
  if (queryTarget && (subPath === '/' || subPath === '/index.dll' || subPath === '/index.html')) {
    fetchUrl = queryTarget;
  } else {
    fetchUrl = targetBase.replace(/\/$/, '') + subPath + fullUrl.search;
  }

  try {
    const forwardHeaders = { ...req.headers };
    delete forwardHeaders.host;
    delete forwardHeaders.connection;
    delete forwardHeaders.referer;

    const response = await fetch(fetchUrl, {
      method: req.method,
      headers: forwardHeaders,
      redirect: 'follow'
    });

    const contentType = response.headers.get('content-type') || '';
    res.setHeader('Content-Type', contentType);
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', "frame-ancestors *");
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Repassar cookies de sessão
    const setCookies = response.headers.getSetCookie?.() || [];
    if (setCookies.length > 0) {
      res.setHeader('Set-Cookie', setCookies.map(c => c.replace(/Path=\/[^;]*/i, 'Path=/')));
    }

    if (contentType.includes('text/html') || contentType.includes('application/javascript') || contentType.includes('text/css')) {
      let body = await response.text();
      
      // REESCRITA DE URLS:
      // Esta é a parte crucial. Substituímos referências que começam com "/" 
      // para passarem pelo nosso proxy.
      // Ex: src="/uni-1.90/..." -> src="/api/proxy-boleto/uni-1.90/..."
      
      const escapedProxyPath = proxyPath.replace(/\//g, '\\/');
      
      // Substitui src="/, href="/, url('/ e caminhos em JS do uniGUI
      body = body.replace(/(src|href)=["']\/([^"']+)["']/g, `$1="${proxyPath}/$2"`);
      body = body.replace(/url\(["']?\/([^"']+)["']?\)/g, `url("${proxyPath}/$1")`);
      
      // Ajuste específico para o motor uniGUI/ExtJS que usa caminhos em strings JS
      if (contentType.includes('text/html') || contentType.includes('javascript')) {
         // Tenta capturar caminhos comuns do uniGUI que começam com / e não foram pegos acima
         body = body.replace(/["']\/(uni-[0-9]|ext-[0-9]|falcon|jQuery)([^"']+)["']/g, `"${proxyPath}/$1$2"`);
      }

      return res.status(response.status).send(body);
    } else {
      const buffer = await response.arrayBuffer();
      return res.status(response.status).send(Buffer.from(buffer));
    }
  } catch (error) {
    console.error('Proxy Fetch Error:', error);
    return res.status(500).send('Erro ao buscar recurso no servidor de boletos: ' + error.message);
  }
}
