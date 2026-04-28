import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TextBlock } from '../../../core/models/blocks/content-block.interface';

@Component({
  selector: 'app-text-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-block prose prose-lg max-w-none dark:prose-invert">
      @if (data.allowHtml) {
        <div [innerHTML]="sanitizedContent"></div>
      } @else {
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          {{ data.content }}
        </p>
      }
    </div>
  `,
  styles: [`
    .text-block {
      line-height: 1.7;
    }

    .prose :deep(p) {
      margin-bottom: 1em;
    }

    .prose :deep(ul), .prose :deep(ol) {
      margin-left: 1.5em;
      margin-bottom: 1em;
    }

    .prose :deep(li) {
      margin-bottom: 0.5em;
    }

    .prose :deep(a) {
      color: #0ea5e9;
      text-decoration: underline;
    }

    .prose :deep(a:hover) {
      color: #0284c7;
    }
  `]
})
export class TextBlockComponent {
  @Input() data!: TextBlock['data'];

  constructor(private sanitizer: DomSanitizer) {}

  get sanitizedContent(): SafeHtml {
    return this.sanitizer.sanitize(1, this.data.content) || '';
  }
}
