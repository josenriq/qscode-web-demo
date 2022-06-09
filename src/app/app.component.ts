import { Component, OnInit } from '@angular/core';
import { CodeDetector, FrequencyDetector } from './audio';

@Component({
  selector: 'qs-root',
  template: ` <button type="button" (click)="start()">Start</button> `,
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

  start(): void {
    this.frequencyDetector.start();
  }
}
