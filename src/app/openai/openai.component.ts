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
