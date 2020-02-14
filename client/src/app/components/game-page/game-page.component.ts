import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Game } from '../../models/game';
import { Answer } from '../../models/answer';
import baseballTeam from '../../gameSeeds/baseball'

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  @ViewChild('gameInput', { static: true }) gameInputEl: ElementRef;
  @Input() gameTitle: string;
  game: Game;
  guess: string;
  timer: any;
  time: number = 60;
  scoreGame: number = 0;
  play: boolean = true;

  constructor() { }

  ngOnInit() {
    switch (this.gameTitle) {
      case 'baseball':
        this.game = baseballTeam;
        break;
      case 'football':
        this.game = baseballTeam;
        console.log('this is just until we make the football list');
        break;
      case 'presidents':
        this.game = baseballTeam;
        console.log('this is just until we make the preisdents list');
        break;
      default:
        this.game = baseballTeam;
        console.log('switch for game assign not working')
    }
  }

  startGame() {
    this.gameInputEl.nativeElement.disabled = false;
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
      const rightTeam: boolean = item.checkAnswer(this.guess.toLowerCase());
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
    console.log(this.gameInputEl)
    this.gameInputEl.nativeElement.disabled = true;
    this.scoreGame = this.game.answers.filter(answer => answer.guessed === true).length;
    this.play = false;
  }

}
