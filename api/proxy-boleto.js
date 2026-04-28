export default async function handler(req, res) {
  const DDNS_HOST = 'http://inforplace.ddns.net:12019';
  const proxyPath = '/api/proxy-boleto';
  
  // Pega o caminho real solicitado (ex: /uni-1.90/...)
  const fullUrl = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  let subPath = fullUrl.pathname.replace(proxyPath, '');
  
  // Monta a URL final para buscar no seu servidor
  const fetchUrl = `${DDNS_HOST}${subPath}${fullUrl.search}`;

  try {
    const response = await fetch(fetchUrl, {
      method: req.method,
      headers: {
        'Accept': req.headers.accept || '*/*',
        'User-Agent': req.headers['user-agent'] || '',
        'Cookie': req.headers.cookie || ''
      }
    });

    const contentType = response.headers.get('content-type');
    const buffer = await response.arrayBuffer();

    // Entrega o arquivo ORIGINAL, sem nenhuma alteração (tradução)
    res.setHeader('Content-Type', contentType || 'application/octet-stream');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', "frame-ancestors *");
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Repassa cookies originais
    const setCookies = response.headers.getSetCookie?.() || [];
    if (setCookies.length > 0) res.setHeader('Set-Cookie', setCookies);

    return res.status(response.status).send(Buffer.from(buffer));

  } catch (error) {
    return res.status(500).send('Erro na conexão com o servidor de boletos.');
  }
}
