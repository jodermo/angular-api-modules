import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenaiComponent } from './openai.component';
import { OpenaiTestComponent } from './openai-test/openai-test.component';
import {OpenaiService} from "./openai.service";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    OpenaiComponent,
    OpenaiTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    OpenaiTestComponent
  ],
  providers: [
    OpenaiService
  ]
})
export class OpenaiModule { }
