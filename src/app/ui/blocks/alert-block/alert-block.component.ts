import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertBlock, AlertType } from '../../../core/models/blocks/content-block.interface';

@Component({
  selector: 'app-alert-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="alert-block p-4 rounded-lg border-l-4 flex items-start gap-3"
      [ngClass]="alertClasses"
    >
      <div class="flex-shrink-0 text-2xl">
        {{ alertIcon }}
      </div>
      <div class="flex-1">
        @if (data.title) {
          <h4 class="font-semibold mb-1">{{ data.title }}</h4>
        }
        <p class="text-sm">{{ data.message }}</p>
      </div>
    </div>
  `,
  styles: []
})
export class AlertBlockComponent {
  @Input() data!: AlertBlock['data'];

  get alertClasses(): string {
    switch (this.data.type) {
      case AlertType.SUCCESS:
        return 'bg-green-50 border-green-500 text-green-900';
      case AlertType.WARNING:
        return 'bg-yellow-50 border-yellow-500 text-yellow-900';
      case AlertType.ERROR:
        return 'bg-red-50 border-red-500 text-red-900';
      case AlertType.INFO:
      default:
        return 'bg-blue-50 border-blue-500 text-blue-900';
    }
  }

  get alertIcon(): string {
    switch (this.data.type) {
      case AlertType.SUCCESS:
        return '✅';
      case AlertType.WARNING:
        return '⚠️';
      case AlertType.ERROR:
        return '❌';
      case AlertType.INFO:
      default:
        return 'ℹ️';
    }
  }
}
