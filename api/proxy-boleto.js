export default async function handler(req, res) {
  let { target } = req.query;

  if (!target) {
    return res.status(400).send('URL de destino é obrigatória');
  }

  try {
    const response = await fetch(target);
    const contentType = response.headers.get('content-type');
    
    // Se não for HTML (ex: JS, CSS, Imagem), apenas repassamos o conteúdo
    if (!contentType || !contentType.includes('text/html')) {
      const buffer = await response.arrayBuffer();
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.send(Buffer.from(buffer));
    }

    // Se for HTML, precisamos injetar a tag <base> para que os links relativos funcionem
    let html = await response.text();
    
    // Pegamos a origem do target (ex: http://inforplace.ddns.net:12019/)
    const targetUrl = new URL(target);
    const baseUrl = `${targetUrl.protocol}//${targetUrl.host}${targetUrl.pathname}`;
    
    // Injetamos a tag <base> logo após o <head>
    // Usamos o próprio proxy como base para que assets também sejam tunnelados e evitem Mixed Content
    const proxyBase = `https://${req.headers.host}/api/proxy-boleto?target=${encodeURIComponent(baseUrl)}`;
    
    html = html.replace('<head>', `<head><base href="${proxyBase}">`);

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', "frame-ancestors *");
    
    return res.send(html);
  } catch (error) {
    console.error('Erro no Proxy:', error);
    return res.status(500).send('Erro ao carregar o boleto: ' + error.message);
  }
}
