import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definimos uma interface para garantir que os dados sigam o padrão correto
export interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-accordion.component.html'
})
export class FaqAccordionComponent {
  data = input.required<FaqItem[]>();
  color = input<string>('orange');
  activeAccordion = signal<number>(-1);

  get colorClasses() {
    const c = this.color();

    const colorMap: { [key: string]: { dark: string, light: string } } = {
      orange: { dark: '#ea580c', light: '#fb923c' },
      blue:   { dark: '#1e40af', light: '#3b82f6' },
      sky:    { dark: '#0284c7', light: '#38bdf8' },
      verde:  { dark: '#15803d', light: '#22c55e' },
      preto:  { dark: '#0f172a', light: '#334155' },
      teal:   { dark: '#0d9488', light: '#2dd4bf' }
    };

    const selected = colorMap[c] || colorMap['orange'];

    return {
      // Usaremos essa cor hex no HTML
      hoverColor: selected.dark,

      textHighlight: `text-${c}-600`,
      textHover: `group-hover:text-${c}-700`,
      iconColor: `text-${c}-500`,
      contentBg: `bg-${c}-100`,
      contentBorder: `border-${c}-100`,
      contentAccent: `border-l-${c}-600`,
      lineStyle: {
        'background': `linear-gradient(to right, ${selected.dark}, ${selected.light})`
      }
    };
  }
// Função auxiliar para pegar as cores hexadecimais
  private getSelectedColor() {
    const colorMap: { [key: string]: { dark: string, light: string } } = {
      orange: { dark: '#ea580c', light: '#fb923c' },
      blue:   { dark: '#1e40af', light: '#3b82f6' },
      sky:    { dark: '#0284c7', light: '#38bdf8' },
      verde:  { dark: '#15803d', light: '#22c55e' },
      preto:  { dark: '#0f172a', light: '#334155' },
      teal:   { dark: '#0d9488', light: '#2dd4bf' }
    };
    return colorMap[this.color()] || colorMap['orange'];
  }
  toggleAccordion(index: number): void {
    this.activeAccordion.update(current => current === index ? -1 : index);
  }
}
