import {Component, input, signal} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-solution-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solution-features.component.html'
})
export class SolutionFeaturesComponent {
  features = input.required<FeatureItem[]>();
  color = input<string>('orange');

  // Adicione uma variável para controlar qual card está com o mouse em cima
  hoveredIndex = signal<number | null>(null);

  get colorClasses() {
    const c = this.color();

    const colorMap: { [key: string]: { dark: string, light: string } } = {
      orange: { dark: '#ea580c', light: '#fb923c' },
      blue:   { dark: '#1e40af', light: '#3b82f6' },
      sky:    { dark: '#0284c7', light: '#38bdf8' },
      verde:  { dark: '#15803d', light: '#22c55e' },
      preto:  { dark: '#0f172a', light: '#334155' },
      teal:   { dark: '#0d9488', light: '#2dd4bf' } // Cor do SAO (Mapa Imobiliário)
    };

    const selected = colorMap[c] || colorMap['orange'];

    return {
      bgLight: `bg-${c}-50`,
      headerSpan: `text-${c}-600`,
      iconTextNormal: `text-${c}-600`,
      borderColor: `border-${c}-500 hover:border-${c}-700`,      // Retornamos a cor sólida para o hover
      solidColor: selected.dark,
      lineStyle: {
        'background': `linear-gradient(to right, ${selected.dark}, ${selected.light})`
      }
    };
  }
}
