export default async function handler(req, res) {
  const { target } = req.query;

  if (!target) {
    return res.status(400).send('URL de destino é obrigatória');
  }

  try {
    // Faz a requisição para o seu servidor DDNS via HTTP (servidor para servidor é permitido)
    const response = await fetch(target);
    const contentType = response.headers.get('content-type');
    const body = await response.arrayBuffer();

    // Repassa o conteúdo para o navegador via HTTPS (o domínio da Vercel)
    res.setHeader('Content-Type', contentType || 'text/html');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Remove restrições de iframe que o seu servidor DDNS possa estar enviando
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', "frame-ancestors *");

    return res.send(Buffer.from(body));
  } catch (error) {
    console.error('Erro no Proxy:', error);
    return res.status(500).send('Erro ao carregar o boleto: ' + error.message);
  }
}
