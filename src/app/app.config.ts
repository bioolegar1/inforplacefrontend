import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    // Otimização de detecção de mudanças
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Configuração de Rotas com restauração de scroll e suporte a Hash para evitar 404 em servidores estáticos
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),

    // Habilita as animações do Angular que instalamos
    provideAnimationsAsync(),
    // Suporte a Server Side Rendering (SSR)
    provideClientHydration(),

    // Configuração do cliente HTTP com interceptadores de autenticação e erro
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, errorInterceptor])
    )
  ]
};
