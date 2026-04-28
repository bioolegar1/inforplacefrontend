export default async function handler(req, res) {
  // Configuração fixa do servidor de boletos
  const DDNS_HOST = 'http://inforplace.ddns.net:12019';
  const proxyPath = '/api/proxy-boleto';
  
  const { target: queryTarget } = req.query;
  const fullUrl = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  
  // 1. Determinar a URL de destino (prioriza query, senao usa o sub-caminho do proxy)
  let fetchUrl = '';
  if (queryTarget) {
    fetchUrl = queryTarget;
  } else {
    // Pega o que vem depois de /api/proxy-boleto
    let subPath = fullUrl.pathname.replace(proxyPath, '');
    if (!subPath.startsWith('/')) subPath = '/' + subPath;
    fetchUrl = `${DDNS_HOST}${subPath}${fullUrl.search}`;
  }

  try {
    // 2. Fazer a requisição para o servidor legado
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
    
    // 3. Configurar cabeçalhos de resposta para o navegador
    res.setHeader('Content-Type', contentType);
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', "frame-ancestors *");
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Repassar cookies de sessão (essencial para uniGUI)
    const setCookies = response.headers.getSetCookie?.() || [];
    if (setCookies.length > 0) {
      res.setHeader('Set-Cookie', setCookies.map(c => c.replace(/Path=\/[^;]*/i, 'Path=/')));
    }

    // 4. Se for HTML, injetar a tag <base> para resolver assets relativos
    if (contentType.includes('text/html')) {
      let html = await response.text();
      
      // Injetamos a tag <base> apontando para o nosso proxy.
      // Isso faz com que o navegador peça AUTOMATICAMENTE todos os assets (CSS/JS) via proxy.
      const proxyBaseUrl = `https://${req.headers.host}${proxyPath}/`;
      
      if (html.includes('<head>')) {
        html = html.replace('<head>', `<head><base href="${proxyBaseUrl}">`);
      } else {
        html = `<base href="${proxyBaseUrl}">${html}`;
      }

      return res.status(response.status).send(html);
    }

    // 5. Para outros arquivos (JS, CSS, Imagens), repassar o buffer original
    const buffer = await response.arrayBuffer();
    return res.status(response.status).send(Buffer.from(buffer));

  } catch (error) {
    console.error('Proxy Error:', error);
    return res.status(500).send('Erro ao acessar o servidor de boletos: ' + error.message);
  }
}
