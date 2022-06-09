import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'qs-spinner',
  template: `
    <div class="sk-wave">
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
    </div>
  `,
})
export class SpinnerComponent {}

@NgModule({
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent],
})
export class SpinnerModule {}
