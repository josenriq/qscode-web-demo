import { Component, OnInit, ViewChild } from '@angular/core';
import { CodeDetector, FrequencyDetector } from './audio';
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
      <qs-spinner class="centered"></qs-spinner>
      <qs-popup class="centered">
        <qs-message-card (onDismiss)="popup?.hide()"></qs-message-card>
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

  constructor(
    private readonly frequencyDetector: FrequencyDetector,
    private readonly codeDetector: CodeDetector,
  ) {}

  ngOnInit(): void {
    this.codeDetector.onCodeDetected$.subscribe(code => {
      // alert('New Code! ' + code),
      this.popup?.show();
    });

    setTimeout(() => this.popup?.show(), 3000);
  }

  get isListening(): boolean {
    return this.frequencyDetector.isListening;
  }

  start(): void {
    this.frequencyDetector.start();
  }
}
