import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import {HeaderComponent} from './core/layout/header/header.component';
import {FooterComponent} from './core/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID); // 1. Injetamos o identificador da plataforma

  // Variável que controla a visibilidade
  isAdminRoute = signal(false);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Lógica de esconder menu (funciona no server e browser)
      this.isAdminRoute.set(event.url.includes('/admin'));

      // 2. CORREÇÃO: Só acessa 'window' se estiver no navegador
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    });
  }
}
