import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Game } from '../../models/game';
import { Answer } from '../../models/answer';
import baseballTeam from '../../gameSeeds/baseball';
import presidentNames from '../../gameSeeds/presidents';
import footballTeams from '../../gameSeeds/football.js'

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
  firstLoad: boolean = true;

  constructor() { }

  ngOnInit() {
    console.log(this.gameTitle)
    switch (this.gameTitle) {
      case 'baseball':
        this.game = baseballTeam;
        break;
      case 'football':
        this.game = footballTeams;
        break;
      case 'presidents':
        this.game = presidentNames;
        break;
      default:
        this.game = baseballTeam;
        console.log('switch for game assign not working')
    }
  }

  startGame() {
    if (this.firstLoad) {
      this.firstLoad = false;
      this.initTimer()
    } else {
      this.guess = '';
      this.game.answers.forEach(answer => answer.guessed = false);
      this.time = 60;
      this.play = true;
      this.initTimer()
    }

  }

  initTimer() {
    this.gameInputEl.nativeElement.disabled = false;
    this.gameInputEl.nativeElement.focus()
    this.timer = setInterval(() => {
      if (this.time <= 0) {
        clearInterval(this.timer);
        this.gameOver()
      } else {
        this.time--
      }
    }, 1000)
  }

  evaluateInput() {
    const answerArr: Answer[] = this.game.answers.filter(answer => answer.guessed === false);
    let wasRight: boolean = false;
    answerArr.forEach((item: Answer) => {
      const rightTeam: boolean = item.checkAnswer(this.guess.trim().toLowerCase());
      console.log(rightTeam)
      if (rightTeam && wasRight === false) {
        wasRight = true
      }
    })
    if (wasRight) {
      this.clearInput();
    }
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
