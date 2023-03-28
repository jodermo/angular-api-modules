import {AfterViewInit, Component} from '@angular/core';
import {OpenaiComponent} from "../openai.component";

@Component({
  selector: 'app-openai-test',
  templateUrl: './openai-test.component.html',
  styleUrls: ['./openai-test.component.scss']
})
export class OpenaiTestComponent extends OpenaiComponent implements AfterViewInit{

  ngAfterViewInit() {
    this.openai.logResponses = true;
    this.openai.useLocalStorage = true;
  }
}
