# OpenAI API Module For Angular
##### *© 2023 - Moritz Petzka - [petzka.com](https://petzka.com/)*

Demo Website:[https://api.dont-use.com](https://https://api.dont-use.com/)

##### OpenAI [https://openai.com/](https://openai.com/)
- *OpenAI API introduction: [https://platform.openai.com/docs/api-reference/introduction](https://platform.openai.com/docs/api-reference/introduction)*
- *Here you will find your API key: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)*
- *OpenAI registration: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)*

<br>


<br>

## Usement Examples


## Include the Module in your Angular Project
*(Last updated 28.03.2023)*
```typescript

import {OpenaiModule} from "./openai/openai.module";

@NgModule({
  ...,
  imports: [
    ...,
    OpenaiModule
  ],
  ...
})
export class AppModule {
}
```
Source: [../app.module.ts](./../app.module.ts)

<br>

### Implementation of the `OpenaiService` in an Angular component  
*(Last updated 28.03.2023)*
```typescript

import {Component, OnInit} from '@angular/core';
import {OpenaiService} from "./openai.service";

@Component({
  selector: 'app-openai',
  template: ''
})
export class OpenaiComponent implements OnInit {

  constructor(public openai: OpenaiService) {
  }

  ngOnInit(): void {
    this.startOpenai();
  }

  startOpenai(): void {
    this.openai.connect();
  }
}


```
Source: [/openai/openai.component.ts](./openai.component.ts)

<br>

### Example to extend an Angular component from `OpenaiComponent` (Last updated 28.03.2023)
```typescript

@Component({
  selector: 'app-openai-test',
  templateUrl: './openai-test.component.html',
  styleUrls: ['./openai-test.component.scss']
})
export class OpenaiTestComponent extends OpenaiComponent{

}

```
Source: [/openai/openai-test/openai-test.component.ts](./openai-test/openai-test.component.ts)


### The example HTML for this Angular component
*(Last updated 28.03.2023)*
```angular2html
<div class="openai-test-component">
  <div class="openai-test-container">
    <div class="openai-test-header">
      <h1>OpenAI - Test Prompt</h1>
    </div>
    <div class="flex-item scroll-container">
      <div class="scroll-content">
        <div class="openai-test-result" *ngIf="openai.connected">
          <table class="openai-response-table">
            <tbody *ngIf="openai.completions.length > 0">
            <ng-container *ngFor="let completion of openai.completions">
              <tr>
                <td>
                  <b>{{openai.timestamp(completion.created)}}</b><br>
                  <i>{{completion.model}} ({{completion.object}})</i>
                </td>
                <th>
                  <ng-container *ngIf="completion.choices">
                <span *ngFor="let choice of completion.choices">
                 {{choice.text}}
                </span>
                  </ng-container>
                </th>
              </tr>
            </ng-container>
            </tbody>
          </table>
        </div>
        <div class="openai-test-result" *ngIf="openai.errors.length > 0">
          <table class="openai-error-table">
            <tbody>
            <ng-container *ngFor="let error of openai.errors">
              <tr>
                <th>
                  <b>Error: {{openai.timestamp(error.time)}}</b>
                </th>
                <td>
                  {{openai.parseError(error.error)}}
                </td>
              </tr>
            </ng-container>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="openai-test-content">
      <table class="openai-request-table">
        <tbody *ngIf="!openai.connected">
        <tr>
          <th>
            API key
          </th>
          <td>
            <div class="field-group">
              <input class="flex-item" type="text" name="api_key" [(ngModel)]="openai.apiKey" placeholder="API Key"/>
            </div>
            <i class="input-hint">
              OpenAi API introduction:
              <a href="https://platform.openai.com/docs/api-reference/introduction">https://platform.openai.com/docs/api-reference/introduction</a>
            </i><br>
            <i class="input-hint">
              Here you will find your API key:
              <a href="https://platform.openai.com/account/api-keys">https://platform.openai.com/account/api-keys</a>
            </i>
          </td>
        </tr>
        <tr>
          <th>
            Options
          </th>
          <td>
            <label class="checkbox-container">
              <input type="checkbox" name="use_local_storage" [(ngModel)]="openai.useLocalStorage">
              Store input data in local storage <i>(will be removed, when disconnect gets clicked)</i>
            </label><br>
            <label class="checkbox-container">
              <input type="checkbox" name="use_log_responses" [(ngModel)]="openai.logResponses">
              Log responses in JavaScript console
            </label>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button class="full-width" (click)="startOpenai()">Connect to API</button>
          </td>
        </tr>
        </tbody>
        <tbody *ngIf="openai.connected">
        <tr>
          <th>
            Model
          </th>
          <td>
            <div class="field-group">
              <select class="flex-item" [(ngModel)]="openai.model" placeholder="Model"
                      (ngModelChange)="openai.setModel($event)">
                <option *ngFor="let engine of openai.engines" [value]="engine.id">{{engine.id}}</option>
              </select>
              <button (click)="openai.disconnect();">Disconnect</button>
            </div>
            <i class="input-hint">
              List with all models:
              <a href="https://platform.openai.com/docs/models/overview">https://platform.openai.com/docs/models/overview</a>
            </i>
          </td>
        </tr>
        <tr *ngIf="openai.model">
          <th>
            Prompt
          </th>
          <td>
            <div class="field-group">
        <textarea class="flex-item" name="completion_prompt" [(ngModel)]="openai.prompt" placeholder="Prompt">
        </textarea>
              <button (click)="openai.createCompletion()">Send</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="copyright">
    <span>© 2023 - Moritz Petzka</span>
    <a href="https://petzka.com" target="_blank">petzka.com</a>
    <span><a href="mailto:info@petzka.com" target="_blank">info@petzka.com</a></span>
    <span>Source Code: <a href="https://github.com/jodermo/angular-api-modules/tree/main/src/app/openai"
                          target="_blank">https://github.com/jodermo/angular-api-modules/tree/main/src/app/openai</a></span>
  </div>
</div>
```

Source: [/openai/openai-test/openai-test.component.html](./openai-test/openai-test.component.html)<br>
Online Example: [https://api.dont-use.com](https://https://api.dont-use.com/)
