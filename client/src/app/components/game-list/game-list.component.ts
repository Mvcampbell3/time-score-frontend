import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  gamesArray: string[] = ['MLB Teams', 'NFL Teams', 'U.S. Presidents'];
  selected: boolean = false;
  selectedGame: string = '';

  constructor() { }

  ngOnInit() {
  }

  selectGame(gameName) {
    console.log(gameName)
    this.selectedGame = gameName;
    this.selected = true;
  }


}
