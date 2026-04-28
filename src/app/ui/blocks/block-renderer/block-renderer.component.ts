import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentBlock, BlockType } from '../../../core/models/blocks/content-block.interface';

import { HeaderBlockComponent } from '../header-block/header-block.component';
import { TextBlockComponent } from '../text-block/text-block.component';
import { ImageBlockComponent } from '../image-block/image-block.component';
import { ComparisonBlockComponent } from '../comparison-block/comparison-block.component';
import { ChecklistBlockComponent } from '../checklist-block/checklist-block.component';
import { ModuleHighlightBlockComponent } from '../module-highlight-block/module-highlight-block.component';
import { AlertBlockComponent } from '../alert-block/alert-block.component';
import { TimelineBlockComponent } from '../timeline-block/timeline-block.component';
import {YoutubeBlockComponent} from '../youtube-block/youtube-block.component';

@Component({
  selector: 'app-block-renderer',
  standalone: true,
  imports: [
    CommonModule,
    HeaderBlockComponent,
    TextBlockComponent,
    ImageBlockComponent,
    ComparisonBlockComponent,
    ChecklistBlockComponent,
    ModuleHighlightBlockComponent,
    AlertBlockComponent,
    TimelineBlockComponent,
    YoutubeBlockComponent
  ],
  template: `
    <div class="block-renderer space-y-8">
      @for (block of sortedBlocks; track block.id) {
        <div
          class="block-wrapper"
          [attr.data-block-type]="block.type"
          [style.animation-delay]="($index * 50) + 'ms'"
        >
          @switch (block.type) {
            @case (BlockType.HEADER) {
              <app-header-block [data]="block.data" />
            }
            @case (BlockType.TEXT) {
              <app-text-block [data]="block.data" />
            }
            @case (BlockType.IMAGE) {
              <app-image-block [data]="block.data" />
            }
            @case (BlockType.COMPARISON) {
              <app-comparison-block [data]="block.data" />
            }
            @case (BlockType.CHECKLIST) {
              <app-checklist-block [data]="block.data" />
            }
            @case (BlockType.MODULE_HIGHLIGHT) {
              <app-module-highlight-block [data]="block.data" />
            }
            @case (BlockType.ALERT) {
              <app-alert-block [data]="block.data" />
            }
            @case (BlockType.TIMELINE) {
              <app-timeline-block [data]="block.data" />
            }
            @case (BlockType.YOUTUBE) {
              <app-youtube-block [data]="block.data"></app-youtube-block>
            }
            @default {
              <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-red-800 font-medium">
                  ⚠️ Tipo de bloco desconhecido: {{ block.type }}
                </p>
              </div>
            }
          }
        </div>
      }

      @if (blocks.length === 0) {
        <div class="text-center py-16 text-gray-500">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-lg">Nenhum conteúdo disponível</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .block-wrapper {
      opacity: 0;
      animation: fadeIn 0.6s ease-in-out forwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class BlockRendererComponent {
  @Input() blocks: ContentBlock[] = [];

  BlockType = BlockType;

  get sortedBlocks(): ContentBlock[] {
    return [...this.blocks].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
}
