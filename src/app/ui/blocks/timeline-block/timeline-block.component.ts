import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineBlock } from '../../../core/models/blocks/content-block.interface';

@Component({
  selector: 'app-timeline-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="timeline-block">
      @if (data.title) {
        <h4 class="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
          {{ data.title }}
        </h4>
      }

      <div class="space-y-6">
        @for (step of data.steps; track $index) {
          <div class="flex gap-4">
            <!-- Linha e Ícone -->
            <div class="flex flex-col items-center">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                [ngClass]="getStepColor(step.status)"
              >
                {{ $index + 1 }}
              </div>
              @if (!$last) {
                <div class="w-0.5 h-full min-h-[40px] bg-gray-300 mt-2"></div>
              }
            </div>

            <!-- Conteúdo -->
            <div class="flex-1 pb-6">
              <h5 class="font-semibold text-gray-900 dark:text-white mb-1">
                {{ step.title }}
              </h5>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                {{ step.description }}
              </p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class TimelineBlockComponent {
  @Input() data!: TimelineBlock['data'];

  getStepColor(status?: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'active':
        return 'bg-primary-500';
      case 'pending':
      default:
        return 'bg-gray-400';
    }
  }
}
