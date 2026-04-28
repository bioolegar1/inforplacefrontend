# Inforplace Frontend Web - Project Overview

This is the modular frontend for the Inforplace Portal, built with **Angular 19+** and **Tailwind CSS**. It features a modern, block-based UI architecture and supports **Server-Side Rendering (SSR)** for SEO and performance.

## 🚀 Main Technologies
- **Framework:** Angular 19 (Standalone Components, SSR)
- **Styling:** Tailwind CSS (Custom Branding)
- **Icons:** Lucide Angular
- **Animations:** Angular Animations & Swiper (Carousels)
- **Infrastructure:** Docker (Node 22-alpine), SSR/Express.mjs

## 📂 Architecture & Directory Structure
The project follows a modular structure focused on scalability and clarity:

- `src/app/core/`: Foundation of the application.
    - `services/`: API communication (`ApiService`), Authentication (`AuthService`).
    - `interceptors/`: Request/Response transformation (`Auth`, `Error`).
    - `guards/`: Route protection (`AuthGuard`).
    - `models/`: Type definitions and interfaces, including the Block system.
- `src/app/features/`: Main application modules.
    - `public/`: Client-facing area (Home, Solutions, Content Hub/Blog).
    - `admin/`: Management dashboard for posts, users, and settings.
- `src/app/ui/blocks/`: A unique **Block-based UI System**.
    - Allows dynamic page construction using components like `Header`, `Text`, `Image`, `Comparison` (Before/After), `Timeline`, and `Youtube`.
- `src/app/shared/`: Reusable components used across features.

## 🛠️ Development & Build Commands

### Local Development
To start the development server with SSL (recommended for full feature support):
```bash
npm start
# or
ng serve --ssl
```
*Note: Uses `cert.pem` and `key.pem` for HTTPS.*

### Building for Production
```bash
npm run build
```
This generates the SSR-ready bundle in `dist/frontend-web`.

### Running in Docker
```bash
docker build -t inforplace-frontend .
docker run -p 4000:4000 inforplace-frontend
```

## 💅 Styling Conventions
- **Tailwind CSS:** Use utility classes for most styling. Custom colors are defined in `tailwind.config.js` (`primary`, `secondary`).
- **CSS Modules:** Component-specific styles are kept in `.component.css` files when utility classes are insufficient.

## 🔑 Environment Configuration
API endpoints are managed via environment files:
- `src/environments/environment.ts` (Development - defaults to `http://localhost:8080`)
- `src/environments/environment.prod.ts` (Production)

## 🏗️ Block System (CMS Logic)
...
- **Renderer:** `BlockRendererComponent` handles the display in the public area.

## 🛠️ Soluções Técnicas & IA (Angular 21)

### Correção de Mixed Content (Boleto)
- **Problema:** O portal roda em HTTPS, mas os sistemas de boleto legados rodam em HTTP, causando bloqueio no iframe.
- **Solução:** Implementado um **Proxy Reverso Dinâmico** no servidor SSR (`src/server.ts`) usando `http-proxy-middleware`. 
- **Fluxo:** O `IpValidationService` agora gera URLs no formato `/api/proxy-boleto?target=...`, que o servidor redireciona com segurança, removendo cabeçalhos restritivos como `X-Frame-Options`.

### Agentic UI & IA
- **@angular/aria:** Instalado para fornecer a base de componentes *headless* e acessíveis, otimizados para manipulação por agentes de IA.
- **Agentic Workflows:** O projeto está preparado para integração com o protocolo AG-UI e ferramentas como Google Genkit para interfaces generativas.

## 📚 Documentação de Referência
- [Angular 21 AI & Agents](https://angular.dev/ai)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io)
- [Server-Side Rendering (SSR) Guide](https://v21.angular.dev/guide/ssr)

