import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter, Subject } from 'rxjs';
import { FrequencyDetector } from './frequency-detector';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function noteFromFrequency(frequency: number): string {
  let noteNum = NOTES.length * (Math.log(frequency / 440) / Math.log(2));
  noteNum = Math.round(noteNum) + 69;
  return NOTES[noteNum % NOTES.length];
}

@Injectable({
  providedIn: 'root',
})
export class CodeDetector {
  private readonly codeDetected$ = new Subject<string>();
  public readonly onCodeDetected$ = this.codeDetected$.asObservable();

  constructor(private readonly frequencyDetector: FrequencyDetector) {
    this.frequencyDetector.onFrequency$
      .pipe(
        distinctUntilChanged(),
        filter(frequency => {
          const MIN_FREQ = 1700;
          const MAX_FREQ = 4000;
          return !(frequency < MIN_FREQ || MAX_FREQ < frequency);
        }),
      )
      .subscribe(frequency => this.onFrequency(frequency));
  }

  private currentCode = '';
  private previousNote = '';

  private onFrequency(frequency: number): void {
    const note = noteFromFrequency(frequency).substring(0, 1);
    if (note === this.previousNote) return;

    this.previousNote = note;
    this.currentCode += note;

    if (note === 'C') {
      if (/^C[ABDEFG]{4,}C$/.test(this.currentCode)) {
        this.codeDetected$.next(this.currentCode);
        this.currentCode = '';
      } else {
        this.currentCode = 'C';
      }
    }
  }
}
