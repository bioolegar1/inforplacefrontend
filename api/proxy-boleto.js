export default async function handler(req, res) {
  const target = 'http://inforplace.ddns.net:12019/';
  
  try {
    // Busca o conteúdo original
    const response = await fetch(target);
    const contentType = response.headers.get('content-type');
    const buffer = await response.arrayBuffer();

    // Entrega exatamente o que recebeu, mas via HTTPS (Vercel)
    res.setHeader('Content-Type', contentType || 'text/html');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', "frame-ancestors *");
    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.send(Buffer.from(buffer));
  } catch (error) {
    return res.status(500).send('Erro ao carregar o boleto.');
  }
}
