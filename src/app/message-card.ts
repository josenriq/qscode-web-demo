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
    <div class="card" style="width: 18rem;">
      <img src="..." class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text"
          >Some quick example text to build on the card title and make up the
          bulk of the card's content.</p
        >
        <div
          class="d-flex flex-row flex-nowrap align-items-center justify-content-end"
        >
          <button type="button" class="btn btn-link" (click)="onDismiss.emit()">
            Dismiss
          </button>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
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
  declarations: [MessageCardComponent],
  exports: [MessageCardComponent],
})
export class MessageCardModule {}
