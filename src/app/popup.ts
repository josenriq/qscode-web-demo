import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';

@Component({
  selector: 'qs-popup',
  template: `
    <div class="wrapper" [class.in]="isVisible">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .wrapper {
        transform: scale(0);
        transition: transform 0.3s cubic-bezier(0.36, 0, 0.66, -0.56);
        &.in {
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: scale(1);
        }
      }
    `,
  ],
})
export class PopupComponent {
  private _isVisible = false;
  get isVisible(): boolean {
    return this._isVisible;
  }

  show(): void {
    this._isVisible = true;
  }

  hide(): void {
    this._isVisible = false;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [PopupComponent],
  exports: [PopupComponent],
})
export class PopupModule {}
