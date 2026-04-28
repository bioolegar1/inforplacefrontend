// src/app/app.routes.server.ts

import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Lógica: Garante que as rotas administrativas sejam processadas apenas no servidor.
  {
    path: 'admin/**',
    renderMode: RenderMode.Server,
  },

  // Lógica: Alterado de 'releases/:slug' para 'posts/:slug' para dar match com o app.routes.ts.
  // Sem isso, o build falha ao tentar extrair rotas para o Prerender.
  {
    path: 'posts/:slug',
    renderMode: RenderMode.Server,
  },

  // Lógica: Rota padrão para as demais páginas do site.
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
