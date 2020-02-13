import { Component, OnInit } from '@angular/core';
import { Game } from '../../../models/game';
import { Answer } from '../../../models/answer';
import baseballTeam from '../../../gameSeeds/baseball'

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  game: Game = baseballTeam;
  guess: string;

  constructor() { }

  ngOnInit() {

  }

  evaluateInput(e) {
    const answerArr: Answer[] = this.game.answers;
    answerArr.forEach((item: Answer) => {
      const rightTeam: boolean = item.checkAnswer(this.guess);
      console.log(rightTeam)
      if (rightTeam) {
        this.clearInput()
      }
    })
  }

  clearInput() {
    this.guess = '';
  }

}
