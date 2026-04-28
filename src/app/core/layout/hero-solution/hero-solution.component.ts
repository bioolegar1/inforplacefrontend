import { Component, input, signal, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

// Estrutura para cada slide do Hero
export interface HeroImage {
  path: string;
  showSystemBar?: boolean; // Se true, adiciona a barra de janela de sistema
}

@Component({
  selector: 'app-hero-solution',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-solution.component.html'
})
export class HeroSolutionComponent {
  // Inputs de conteúdo
  tag = input.required<string>();
  titlePrincipal = input.required<string>();
  titleDestaque = input.required<string>();
  description = input.required<string>();
  images = input.required<HeroImage[]>();

  // Inputs de estilo e comportamento
  color = input<string>('orange');
  /**
   * Modos de proporção:
   * 'wide': 16:9 padrão
   * 'tela': 4:3 monitor
   * 'mobile': 9:16 vertical
   * 'auto': Respeita o formato original do arquivo de imagem
   */
  aspectType = input<'wide' | 'tela' | 'mobile' | 'auto'>('wide');

  contactClick = output<void>();

  currentIndex = signal<number>(1);
  isHovering = signal<boolean>(false);

  /**
   * layoutConfig: Centraliza a lógica de CSS.
   * Quando o modo é 'auto', removemos larguras fixas para deixar a imagem fluir.
   */
  layoutConfig = computed(() => {
    const type = this.aspectType();
    switch (type) {
      case 'mobile':
        return {
          aspectClass: 'aspect-[9/16]',
          containerWidth: 'w-[280px]',
          imgFit: 'object-cover',
          baseOffset: 110,
          hoverOffset: 160
        };
      case 'tela':
        return {
          aspectClass: 'aspect-[4/3]',
          containerWidth: 'w-[450px]',
          imgFit: 'object-cover',
          baseOffset: 140,
          hoverOffset: 200
        };
      case 'auto':
        return {
          aspectClass: 'aspect-auto',
          containerWidth: 'max-w-[550px]', // Limite máximo de segurança
          imgFit: 'contain',              // Mostra a imagem inteira sem cortes
          baseOffset: 160,
          hoverOffset: 220
        };
      case 'wide':
      default:
        return {
          aspectClass: 'aspect-video',
          containerWidth: 'w-[500px]',
          imgFit: 'object-cover',
          baseOffset: 160,
          hoverOffset: 220
        };
    }
  });

  onMouseMove(event: MouseEvent): void {
    this.isHovering.set(true);
    const target = event.currentTarget as HTMLElement;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;

    if (width === 0) return;

    const position = x / width;
    // Calcula a zona baseada na quantidade real de imagens
    const zone = Math.floor(position * this.images().length);
    this.currentIndex.set(zone);
  }

  onMouseLeave(): void {
    this.isHovering.set(false);
    // Volta para a imagem do meio automaticamente
    this.currentIndex.set(Math.floor(this.images().length / 2));
  }

  getZIndex(index: number): number {
    return index === this.currentIndex() ? 30 : 10;
  }

  getOpacity(index: number): number {
    return index === this.currentIndex() ? 1 : 0.5;
  }

  getTransform(index: number): string {
    const current = this.currentIndex();
    const hovering = this.isHovering();
    const config = this.layoutConfig();

    if (index === current) {
      return `scale(${hovering ? 1.4 : 1.10}) translateX(0)`;
    }

    const baseOffset = hovering ? config.hoverOffset : config.baseOffset;
    const offset = (index - current) * baseOffset;

    return `scale(0.85) translateX(${offset}px)`;
  }

  onContactClick(event: Event): void {
    event.preventDefault();
    this.contactClick.emit();
  }

  get colorClasses() {
    const c = this.color();
    const colorMap: any = {
      orange: { from: '#7c2d12', to: '#111827', button: '#ea580c', accent: '#fb923c' },
      blue: { from: '#1e3a8a', to: '#111827', button: '#1e40af', accent: '#60a5fa' },
      azul: { from: '#1e3a8a', to: '#111827', button: '#1e40af', accent: '#60a5fa' },
      sky: { from: '#0c4a6e', to: '#111827', button: '#0284c7', accent: '#38bdf8' },
      teal: { from: '#134e4a', to: '#111827', button: '#0d9488', accent: '#2dd4bf' },
      verde: { from: '#064e3b', to: '#111827', button: '#15803d', accent: '#4ade80' },
      preto: { from: '#1f2937', to: '#030712', button: '#374151', accent: '#94a3b8' }
    };

    const selected = colorMap[c] || colorMap['orange'];

    return {
      tagBg: `bg-${c}-500/10`,
      tagText: `text-${c}-400`,
      tagBorder: `border-${c}-500/30`,
      accentBorder: `border-${c}-500`,
      heroStyle: { 'background': `linear-gradient(to bottom right, ${selected.from}, ${selected.to})` },
      buttonStyle: { 'background-color': selected.button },
      accentText: { 'color': selected.accent }
    };
  }
}
