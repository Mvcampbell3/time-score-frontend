import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  @Output() sendToPage: EventEmitter<string> = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  toHomePage() {
    this.sendToPage.emit('home')
  }

  toGamesList() {
    this.sendToPage.emit('gamesList');
  }

}
