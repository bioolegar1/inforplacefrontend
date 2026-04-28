import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageBlock } from '../../../core/models/blocks/content-block.interface';

@Component({
  selector: 'app-image-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="image-block" [ngClass]="widthClass">
      <div class="relative group">
        <img
          [src]="data.url"
          [alt]="data.alt"
          class="w-full h-auto rounded-lg shadow-lg transition-transform duration-300"
          [class.cursor-zoom-in]="data.zoomable"
          (click)="data.zoomable && toggleZoom()"
          loading="lazy"
        />

        @if (data.zoomable) {
          <div class="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            🔍 Clique para ampliar
          </div>
        }
      </div>

      @if (data.caption) {
        <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-3 italic">
          {{ data.caption }}
        </p>
      }
    </div>

    @if (isZoomed()) {
      <div
        class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
        (click)="toggleZoom()"
      >
        <img
          [src]="data.url"
          [alt]="data.alt"
          class="max-w-full max-h-full object-contain"
        />
      </div>
    }
  `,
  styles: [`
    .cursor-zoom-in {
      cursor: zoom-in;
    }

    .cursor-zoom-out {
      cursor: zoom-out;
    }
  `]
})
export class ImageBlockComponent {
  @Input() data!: ImageBlock['data'];
  isZoomed = signal(false);

  get widthClass(): string {
    switch (this.data.width) {
      case 'small':
        return 'max-w-md mx-auto';
      case 'medium':
        return 'max-w-2xl mx-auto';
      case 'large':
        return 'max-w-4xl mx-auto';
      case 'full':
      default:
        return 'w-full';
    }
  }

  toggleZoom(): void {
    this.isZoomed.update(v => !v);
  }
}
