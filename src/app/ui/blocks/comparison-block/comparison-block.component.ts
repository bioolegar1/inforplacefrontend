import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComparisonBlock } from '../../../core/models/blocks/content-block.interface';

@Component({
  selector: 'app-comparison-block',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="comparison-container select-none">
      <div class="relative w-full overflow-hidden rounded-lg shadow-lg bg-gray-100"
           [style.aspect-ratio]="'16/9'">

        <img [src]="data.imageAfter"
             class="absolute inset-0 w-full h-full object-cover"
             alt="Depois">
        <div class="absolute top-4 right-4 bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded z-10">
          DEPOIS
        </div>

        <div class="absolute inset-0 w-full h-full"
             [style.clip-path]="'inset(0 ' + (100 - sliderValue) + '% 0 0)'">
          <img [src]="data.imageBefore"
               class="absolute inset-0 w-full h-full object-cover"
               alt="Antes">

          <div class="absolute top-4 left-4 bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded">
            ANTES
          </div>
        </div>

        <div class="absolute inset-y-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
             [style.left.%]="sliderValue">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>

        <input type="range"
               min="0" max="100"
               [(ngModel)]="sliderValue"
               class="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0"
               aria-label="Controle de comparação antes e depois">
      </div>

      @if (data.captionBefore || data.captionAfter) {
        <div class="flex justify-between mt-2 text-sm text-gray-500 italic">
          <span>{{ data.captionBefore }}</span>
          <span>{{ data.captionAfter }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    /* Remove o estilo padrão do input range para garantir que fique invisível mas clicável */
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 100%;
      width: 0px; /* Thumb invisível */
    }
    input[type=range]::-moz-range-thumb {
      height: 100%;
      width: 0;
      border: none;
    }
  `]
})
export class ComparisonBlockComponent {
  @Input() data!: ComparisonBlock['data'];

  // Inicia no meio (50%) se não houver valor salvo
  protected sliderValue = 50;

  ngOnInit() {
    if (this.data.sliderPosition) {
      this.sliderValue = this.data.sliderPosition;
    }
  }
}
