import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SpinnerModule } from './spinner';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SpinnerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
