import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CodeDetector, FrequencyDetector } from './audio';
import { CodeMessage, MESSAGES } from './messages';
import { PopupComponent } from './popup';

@Component({
  selector: 'qs-root',
  template: `
    <button
      *ngIf="!isListening"
      type="button"
      class="btn btn-lg btn-primary centered"
      (click)="start()"
    >
      Start
    </button>
    <ng-container *ngIf="isListening">
      <div class="centered text-center">
        <div
          class="d-flex flex-column flex-nowrap align-items-center justify-content-center"
        >
          <qs-spinner></qs-spinner>
          <div class="text-muted small mt-2">Listening</div>
        </div>
      </div>
      <qs-popup class="centered">
        <qs-message-card
          [imageUrl]="currentMessage?.imageUrl"
          [title]="currentMessage?.title"
          [text]="currentMessage?.text"
          [actionUrl]="currentMessage?.actionUrl"
          [actionText]="currentMessage?.actionText"
          (onDismiss)="popup?.hide()"
        ></qs-message-card>
      </qs-popup>
    </ng-container>
  `,
  styles: [
    `
      .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  @ViewChild(PopupComponent) popup?: PopupComponent;

  currentMessage?: CodeMessage;

  constructor(
    private readonly frequencyDetector: FrequencyDetector,
    private readonly codeDetector: CodeDetector,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.codeDetector.onCodeDetected$.subscribe(code => {
      const msg = MESSAGES[code];
      if (msg && !this.popup?.isVisible) {
        this.currentMessage = msg;
        this.changeDetector.detectChanges();
        this.popup?.show();
      }
    });
  }

  get isListening(): boolean {
    return this.frequencyDetector.isListening;
  }

  start(): void {
    this.frequencyDetector.start();
  }
}
