import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Game } from '../../../models/game';
import { Answer } from '../../../models/answer';
import baseballTeam from '../../../gameSeeds/baseball'

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  @ViewChild('gameInput', { static: true }) gameInput: ElementRef;
  game: Game = baseballTeam;
  guess: string;
  timer: any;
  time: number = 60;
  scoreGame: number = 0;
  play: boolean = true;

  constructor() { }

  ngOnInit() {

  }

  startGame() {
    this.gameInput.nativeElement.disabled = false;
    this.timer = setInterval(() => {
      if (this.time <= 0) {
        clearInterval(this.timer);
        this.gameOver()
      } else {
        this.time--;
      }
    }, 1000)
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

  gameOver() {
    console.log(this.gameInput)
    this.gameInput.nativeElement.disabled = true;
    this.scoreGame = this.game.answers.filter(answer => answer.guessed === true).length;
    this.play = false;
  }

}
