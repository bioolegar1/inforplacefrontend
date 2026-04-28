import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBlock } from '../../../core/models/blocks/content-block.interface';

@Component({
  selector: 'app-header-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="header-block" [ngClass]="alignmentClass">
      @switch (data.level) {
        @case (1) {
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            {{ data.title }}
          </h1>
        }
        @case (2) {
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {{ data.title }}
          </h2>
        }
        @case (3) {
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {{ data.title }}
          </h3>
        }
        @case (4) {
          <h4 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {{ data.title }}
          </h4>
        }
        @case (5) {
          <h5 class="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {{ data.title }}
          </h5>
        }
        @case (6) {
          <h6 class="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {{ data.title }}
          </h6>
        }
      }

      @if (data.subtitle) {
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-2">
          {{ data.subtitle }}
        </p>
      }
    </div>
  `,
  styles: [`
    .header-block {
      margin-bottom: 1.5rem;
    }
  `]
})
export class HeaderBlockComponent {
  @Input() data!: HeaderBlock['data'];

  get alignmentClass(): string {
    switch (this.data.alignment) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  }
}
