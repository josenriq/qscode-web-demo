import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MessageCardModule } from './message-card';
import { PopupModule } from './popup';
import { SpinnerModule } from './spinner';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SpinnerModule, PopupModule, MessageCardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
