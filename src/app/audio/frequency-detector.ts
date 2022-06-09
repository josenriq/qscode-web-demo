import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { autoCorrelate } from './auto-correlate';

@Injectable({
  providedIn: 'root',
})
export class FrequencyDetector {
  private readonly frequency$ = new Subject<number>();
  public readonly onFrequency$ = this.frequency$.asObservable();

  private readonly window: Window & typeof globalThis;
  private audioContext?: AudioContext;

  constructor(@Inject(DOCUMENT) document: Document) {
    if (!document.defaultView) throw new Error('Could not find window');
    this.window = document.defaultView;
  }

  public get isListening() {
    return !!this.audioContext;
  }

  public stop(): void {
    this.audioContext?.close();
    delete this.audioContext;
  }

  public async start(): Promise<void> {
    if (this.isListening) this.stop();

    this.audioContext = new this.window.AudioContext();
    if (!this.audioContext) {
      throw new Error('Could not create audio context');
    }

    const analyser = this.audioContext.createAnalyser();
    analyser.minDecibels = -100;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;

    if (!this.window.navigator?.mediaDevices?.getUserMedia) {
      throw new Error('getUserMedia is required');
    }

    try {
      const stream = await this.window.navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const source = this.audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const listen = () => {
        if (!this.isListening || !this.audioContext) return;
        this.window.requestAnimationFrame(() => listen());

        const bufferLength = analyser.fftSize;
        const buffer = new Float32Array(bufferLength);
        analyser.getFloatTimeDomainData(buffer);

        const frequency = autoCorrelate(buffer, this.audioContext.sampleRate);
        this.frequency$.next(frequency);
      };
      listen();
    } catch (error) {
      console.error('Could not listen to audio', error);
      throw error;
    }
  }
}
