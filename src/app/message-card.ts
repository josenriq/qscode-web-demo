import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';

@Component({
  selector: 'qs-message-card',
  template: `
    <div class="card">
      <img *ngIf="!!imageUrl" [src]="imageUrl" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text small">{{ text }}</p>
        <div
          class="d-flex flex-row flex-nowrap align-items-center justify-content-end"
        >
          <button type="button" class="btn btn-link" (click)="onDismiss.emit()">
            Dismiss
          </button>
          <a
            *ngIf="actionText && actionUrl"
            [href]="actionUrl"
            target="_blank"
            class="btn btn-primary"
            >{{ actionText }}</a
          >
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        width: 90vw;
        max-width: 30rem;
        box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.3);
      }
    `,
  ],
})
export class MessageCardComponent {
  @Input() imageUrl?: string;
  @Input() title?: string;
  @Input() text?: string;
  @Input() actionUrl?: string;
  @Input() actionText?: string;

  @Output() onDismiss = new EventEmitter<void>();
}

@NgModule({
  imports: [CommonModule],
  declarations: [MessageCardComponent],
  exports: [MessageCardComponent],
})
export class MessageCardModule {}
