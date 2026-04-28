export default async function handler(req, res) {
  const { target: queryTarget } = req.query;
  const targetCookieName = 'proxy-target-host';
  
  let targetBase = '';

  // 1. Identificar o Target Host
  if (queryTarget) {
    try {
      const urlObj = new URL(queryTarget);
      const lastSlash = urlObj.pathname.lastIndexOf('/');
      const basePath = urlObj.pathname.substring(0, lastSlash + 1);
      targetBase = `${urlObj.protocol}//${urlObj.host}${basePath}`;
      
      res.setHeader('Set-Cookie', [
        `${targetCookieName}=${encodeURIComponent(targetBase)}; Path=/api/proxy-boleto; HttpOnly; SameSite=Lax; Max-Age=3600`
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
    return res.status(400).send('URL de destino não encontrada. Use o parâmetro ?target= na primeira chamada.');
  }

  // 2. Construir a URL final de destino
  const fullUrl = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  let subPath = fullUrl.pathname.replace('/api/proxy-boleto', '');
  if (subPath.startsWith('/')) subPath = subPath.substring(1);

  let fetchUrl;
  if (queryTarget && (subPath === '' || subPath === 'index.dll' || subPath === 'index.html')) {
    fetchUrl = queryTarget;
  } else {
    fetchUrl = targetBase.replace(/\/$/, '') + '/' + subPath.replace(/^\//, '') + fullUrl.search;
  }

  const finalFetchUrl = new URL(fetchUrl);
  finalFetchUrl.searchParams.delete('target');

  // 3. Preparar headers para o fetch
  const forwardHeaders = { ...req.headers };
  delete forwardHeaders.host;
  delete forwardHeaders.connection;
  delete forwardHeaders.referer;

  // Filtrar cookies: remover o cookie do proxy e manter os do uniGUI
  if (forwardHeaders.cookie) {
    forwardHeaders.cookie = forwardHeaders.cookie
      .split(';')
      .map(c => c.trim())
      .filter(c => !c.startsWith(targetCookieName + '='))
      .join('; ');
  }

  try {
    const response = await fetch(finalFetchUrl.toString(), {
      method: req.method,
      headers: forwardHeaders,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? (typeof req.body === 'object' ? JSON.stringify(req.body) : req.body) : undefined,
      redirect: 'manual'
    });

    // 4. Repassar headers de resposta
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    
    // Headers de segurança para Iframe
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', "frame-ancestors *");
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Repassar cookies do sistema legado (Set-Cookie)
    // Usamos getSetCookie para pegar múltiplos headers Set-Cookie se disponíveis
    const setCookies = (response.headers.getSetCookie && response.headers.getSetCookie()) || [];
    if (setCookies.length > 0) {
      // Ajustar path dos cookies legados para que o browser os envie de volta via proxy
      const adjustedCookies = setCookies.map(c => {
        if (c.toLowerCase().includes('path=/')) {
           return c.replace(/path=\/[^;]*/i, 'Path=/api/proxy-boleto');
        }
        return c + '; Path=/api/proxy-boleto';
      });
      res.setHeader('Set-Cookie', [
        ...(res.getHeader('Set-Cookie') || []),
        ...adjustedCookies
      ]);
    }

    // 5. Tratar redirecionamentos
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (location) {
        // Se o redirecionamento for absoluto para o servidor legado, trazemos de volta para o proxy
        const legacyBase = new URL(targetBase);
        if (location.startsWith(legacyBase.origin) || !location.startsWith('http')) {
           const relativeLocation = location.replace(legacyBase.origin, '');
           const proxyLocation = `/api/proxy-boleto${relativeLocation.startsWith('/') ? '' : '/'}${relativeLocation}`;
           res.setHeader('Location', proxyLocation);
        } else {
           res.setHeader('Location', location);
        }
      }
      return res.status(response.status).end();
    }

    // 6. Retornar conteúdo
    if (contentType.includes('text') || contentType.includes('javascript') || contentType.includes('json') || contentType.includes('xml')) {
      let body = await response.text();
      
      if (contentType.includes('text/html')) {
        const baseHref = `https://${req.headers.host}/api/proxy-boleto/`;
        if (body.includes('<head>')) {
          body = body.replace('<head>', `<head><base href="${baseHref}">`);
        } else {
          body = `<base href="${baseHref}">${body}`;
        }
      }
      return res.status(response.status).send(body);
    } else {
      const buffer = await response.arrayBuffer();
      return res.status(response.status).send(Buffer.from(buffer));
    }
  } catch (error) {
    console.error('Proxy Error:', error);
    return res.status(500).send('Erro no Proxy: ' + error.message);
  }
}
