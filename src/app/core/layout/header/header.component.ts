import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // <--- Removi o RouterLinkActive daqui
@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // <--- ADICIONE ISSO
  imports: [CommonModule, RouterLink, ], // <--- Removi daqui também
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  // 1. Estado do Menu Mobile (Signals)
  isMobileMenuOpen = signal(false);
  isMobileSolutionsOpen = signal(false);

  // 2. Dados do Menu (Signals)
  solutionsMenu = signal([
    { name: 'Sistema SAFE', icon: 'safe.png', link: '/safe' },
    { name: 'Nota Info', icon: 'sao.png', link: '/notainfo' },
    { name: 'Sistema Pillar', icon: 'pillar42x42.png', link: '/pillar' },
    { name: 'Pillar REMOTO', icon: 'pillar42x42.png', link: '/pillarmobile' },
    { name: 'PVInfo - Ponto de Venda', icon: 'pvinfo.png', link: '/pvinfo' },
    { name: 'Coletor XML', icon: 'Coletorxml.png', link: '/coletorxml' },
    { name: 'Custo de Obras', icon: 'custodeobras.png', link: '/obras' },
  ]);

  // 3. Funções de Controle
  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }

  toggleMobileSolutions() {
    this.isMobileSolutionsOpen.update(value => !value);
  }

  closeMenu() {
    this.isMobileMenuOpen.set(false);
    this.isMobileSolutionsOpen.set(false);
  }
}
