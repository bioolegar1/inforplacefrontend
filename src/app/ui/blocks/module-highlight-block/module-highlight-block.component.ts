import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleHighlightBlock } from '../../../core/models/blocks/content-block.interface';

@Component({
  selector: 'app-module-highlight-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="module-highlight-block rounded-xl shadow-lg overflow-hidden"
      [ngClass]="variantClasses"
    >
      <div class="p-6 md:p-8">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
          <!-- Ícone -->
          <div class="flex-shrink-0">
            <img
              [src]="data.iconUrl"
              [alt]="data.title"
              class="w-20 h-20 md:w-24 md:h-24 object-contain"
            />
          </div>

          <!-- Conteúdo -->
          <div class="flex-1">
            <h3 class="text-2xl md:text-3xl font-bold mb-2">
              {{ data.title }}
            </h3>

            @if (data.subtitle) {
              <p class="text-lg opacity-90 mb-4">
                {{ data.subtitle }}
              </p>
            }

            <ul class="space-y-2">
              @for (feature of data.features; track $index) {
                <li class="flex items-start gap-2">
                  <span class="text-xl flex-shrink-0">✨</span>
                  <span>{{ feature }}</span>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ModuleHighlightBlockComponent {
  @Input() data!: ModuleHighlightBlock['data'];

  get variantClasses(): string {
    switch (this.data.variant) {
      case 'secondary':
        return 'bg-gradient-to-br from-purple-500 to-purple-700 text-white';
      case 'accent':
        return 'bg-gradient-to-br from-pink-500 to-rose-700 text-white';
      case 'primary':
      default:
        return 'bg-gradient-to-br from-primary-500 to-primary-700 text-white';
    }
  }
}
