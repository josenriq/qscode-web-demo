import { Component, OnInit } from '@angular/core';
import { CodeDetector, FrequencyDetector } from './audio';

@Component({
  selector: 'qs-root',
  template: `
    <div class="centered">
      <button
        *ngIf="!isListening"
        type="button"
        class="btn btn-lg btn-primary"
        (click)="start()"
      >
        Start
      </button>
      <qs-spinner *ngIf="isListening"></qs-spinner>
    </div>
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
  constructor(
    private readonly frequencyDetector: FrequencyDetector,
    private readonly codeDetector: CodeDetector,
  ) {}

  ngOnInit(): void {
    this.codeDetector.onCodeDetected$.subscribe(code =>
      alert('New Code! ' + code),
    );
  }

  get isListening(): boolean {
    return this.frequencyDetector.isListening;
  }

  start(): void {
    this.frequencyDetector.start();
  }
}
