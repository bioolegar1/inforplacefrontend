# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Visão geral

Portal institucional da Inforplace (vitrine das soluções Pillar, Safe, Custo de Obras, NOTAinfo, PVinfo, Coletor XML) com um hub de postagens dinâmico e uma área administrativa para gerenciar conteúdo. O backend é uma API Spring Boot separada (não está neste repositório), acessada em `http://localhost:8080` no desenvolvimento.

Stack real (ver `package.json`): **Angular 21** com componentes standalone, SSR (`@angular/ssr` + Express), Tailwind CSS 3 (`@tailwindcss/forms` e `typography`), `lucide-angular`, `swiper`, `date-fns`, `dompurify`. Node 22 (Dockerfile).

Obs.: o README fala em arquitetura *zoneless*, mas o app ainda usa `zone.js` e `provideZoneChangeDetection` (`src/app/app.config.ts`).

## Comandos

```bash
npm install
npm start              # ng serve --ssl → https://localhost:4200 (usa proxy.conf.json)
npm run dev            # ng serve em development, abre o navegador
npm run build          # build de produção (defaultConfiguration = production), saída em dist/frontend-web
npm run serve:ssr      # sobe o servidor SSR do build: node dist/frontend-web/server/server.mjs (porta 4000 ou $PORT)
npm test               # Karma + Jasmine
npx ng test --include src/app/caminho/arquivo.spec.ts   # rodar um único spec

docker build -t inforplace-frontend .
docker run -p 4000:4000 inforplace-frontend
```

Não há lint configurado e, no momento, não existe nenhum arquivo `*.spec.ts` no projeto.

## Arquitetura

### Estrutura de `src/app`
- `core/` — serviços, guards, interceptors, models e os componentes de layout compartilhados (header, footer, hero, FAQ, CTA etc. ficam em `core/layout/`).
- `features/public/` — páginas públicas: home, hub de posts (`post-hub`, `post-detail`), páginas de cada solução (`solutions/*`) e páginas institucionais (`components/*`).
- `features/admin/` — área administrativa (login, layout, dashboard, posts, users, settings).
- `ui/blocks/` — componentes do CMS por blocos.

### Roteamento e SSR
- Todas as rotas usam `loadComponent` (lazy) em `src/app/app.routes.ts`; `/admin/**` é protegido por `authGuard` e renderizado dentro de `AdminLayoutComponent`. Rota curinga redireciona para a home.
- O router usa **`withHashLocation()`** — URLs ficam no formato `/#/rota`. Leve isso em conta ao gerar links ou redirecionamentos.
- `src/app/app.routes.server.ts` define `RenderMode.Server` para tudo (sem prerender). Uma rota com parâmetro adicionada em `app.routes.ts` precisa ser compatível aqui, senão o build quebra na extração de rotas.
- Como há SSR, qualquer acesso a `window`/`localStorage`/`document` precisa de guarda `isPlatformBrowser` (padrão já usado em `AuthService`).

### Comunicação com a API
- `core/services/api.service.ts` é uma classe base com `get/post/put/patch/delete` protegidos que prefixam `environment.apiUrl`. Serviços de domínio (ex.: `PostService`) **estendem** `ApiService` e passam apenas o path (`/public/posts`, `/admin/posts`, ...).
- Ambientes: `environment.ts` (dev) aponta para `http://localhost:8080`; `environment.prod.ts` usa caminhos relativos `/api` (substituído via `fileReplacements` no build de produção).
- Interceptors funcionais registrados em `app.config.ts`: `authInterceptor` adiciona `Authorization: Bearer <token>` (token JWT em `localStorage`); `errorInterceptor` traduz erros HTTP em mensagens pt-BR e, em 401, faz logout e manda para `/admin/login`.
- Autenticação: `AuthService` guarda `token`/`user` em `localStorage` e expõe `currentUser` como signal.

### CMS por blocos (posts)
- O conteúdo de um post é uma lista de `ContentBlock { id, type, order, data }` (salva como JSONB no backend). Os tipos ficam em `src/app/core/models/blocks/content-block.interface.ts` (enum `BlockType` + interfaces tipadas + type guards).
- `ui/blocks/block-renderer` renderiza (ordenando por `order`) via `@switch` no `BlockType`; `ui/blocks/block-manager` é o editor usado no `post-editor` do admin.
- Para adicionar um novo tipo de bloco: incluir no enum e criar a interface em `content-block.interface.ts`, criar o componente em `ui/blocks/`, adicionar o `@case` no `block-renderer` e a opção no `block-manager`.
- Existe um arquivo antigo/duplicado `ui/blocks/conent-block.interface.ts` que não é usado; use sempre o de `core/models/blocks/`.

### Boletos (sistema legado)
A rota `/gerar-boleto` (`safe-wrapper`) hoje apenas redireciona para `http://inforplace.ddns.net:12019/`. Houve várias tentativas anteriores de embutir o sistema legado via proxy/iframe, e restos delas continuam no repo:
- `api/proxy-boleto.js` — função serverless da Vercel que faz proxy para o host DDNS;
- `vercel.json` — rewrites de `/uni-*`, `/ext-*`, `/falcon/*`, `/jQuery/*` para essa função, além do fallback SPA para `index.html`;
- `src/server.ts` — middleware Express `/api/proxy-boleto` (proxy dinâmico via query `target`, remove `X-Frame-Options`/CSP);
- `proxy.conf.json` — no dev server, `/api/proxy-boleto` → host DDNS e `/api` → `localhost:8080`.

### Deploy
- Vercel (`vercel.json`) e Docker (`Dockerfile`: build com `npm run build -- --configuration production` e execução de `dist/frontend-web/server/server.mjs` na porta 4000).

## Convenções
- Componentes standalone, estilo em arquivo `.css` separado (schematic configurado em `angular.json`), prefixo de seletor `app`.
- Código, comentários e textos de UI em português; os comentários costumam começar com `// Lógica: ...`.
- Tema Tailwind: paletas `primary` (azul, 500 = `#0ea5e9`) e `secondary` (verde) em `tailwind.config.js`; `darkMode: 'class'`.
- Budgets de produção: bundle inicial com aviso em 2 MB e erro em 4 MB; CSS por componente com aviso em 20 kB e erro em 50 kB.

## Referências
- [Guia de SSR do Angular 21](https://v21.angular.dev/guide/ssr)
- [Angular AI](https://angular.dev/ai)
