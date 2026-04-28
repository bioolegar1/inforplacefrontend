import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistBlock } from '../../../core/models/blocks/content-block.interface';

@Component({
  selector: 'app-checklist-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="checklist-block">
      @if (data.title) {
        <h4 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {{ data.title }}
        </h4>
      }

      <ul class="space-y-2">
        @for (item of data.items; track $index) {
          <li
            class="flex items-start gap-3 p-3 rounded-lg transition-colors"
            [class.bg-primary-50]="item.highlight"
            [class.border-l-4]="item.highlight"
            [class.border-primary-500]="item.highlight"
          >
            <span class="text-2xl flex-shrink-0">
              {{ item.checked ? '✅' : '⬜' }}
            </span>
            <span
              class="flex-1 pt-1"
              [class.font-semibold]="item.highlight"
              [class.text-primary-700]="item.highlight"
            >
              {{ item.text }}
            </span>
          </li>
        }
      </ul>
    </div>
  `,
  styles: []
})
export class ChecklistBlockComponent {
  @Input() data!: ChecklistBlock['data'];
}
