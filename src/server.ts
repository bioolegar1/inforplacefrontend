import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createProxyMiddleware } from 'http-proxy-middleware';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();

// Proxy dinâmico para o boleto (HTTP para HTTPS)
app.use('/api/proxy-boleto', (req, res, next) => {
  const target = req.query['target'] as string;
  if (!target) {
    return res.status(400).send('Target URL is required');
  }

  return createProxyMiddleware({
    target: target,
    changeOrigin: true,
    secure: false, // Permite conexões HTTP/auto-assinadas no destino
    pathRewrite: {
      '^/api/proxy-boleto': '', // Remove o prefixo ao enviar para o destino
    },
    on: {
      proxyRes: (proxyRes, req, res) => {
        // Remove headers que podem impedir a exibição em iframe
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
      },
      error: (err, req, res) => {
        console.error('Proxy Error:', err);
      }
    }
  })(req, res, next);
});

const angularApp = new AngularNodeAppEngine();

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
