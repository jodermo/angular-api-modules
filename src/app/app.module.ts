import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {OpenaiModule} from "./openai/openai.module";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        OpenaiModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }