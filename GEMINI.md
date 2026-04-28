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
The portal uses a `ContentBlock` architecture. Each page/post is composed of an array of blocks.
- **Block Types:** `HEADER`, `TEXT`, `IMAGE`, `COMPARISON`, `CHECKLIST`, `MODULE_HIGHLIGHT`, `ALERT`, `TIMELINE`, `YOUTUBE`.
- **Manager:** `BlockManagerComponent` handles the editing interface for these blocks in the admin area.
- **Renderer:** `BlockRendererComponent` handles the display in the public area.
