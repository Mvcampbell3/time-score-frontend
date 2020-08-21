import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Game } from '../../models/game';
import { Answer } from '../../models/answer';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})

export class GamePageComponent implements OnInit, OnDestroy {
  @ViewChild('gameInput', { static: false }) gameInputEl: ElementRef;
  @ViewChild('endGameModal', { static: false }) endGameModal: ElementRef;
  @Input() gameTitle: string;
  @Output() back: EventEmitter<void> = new EventEmitter;

  game: Game;
  guess: string;
  timer: any;
  time: number = 600;
  scoreGame: number = 0;
  play: boolean = true;
  firstLoad: boolean = true;
  ongoing: boolean = false;

  ready: boolean = false;

  game_id: string;

  constructor(
    public db: AngularFireDatabase,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      this.game_id = params.params.id;
      console.log(this.game_id);
      this.getGame();
    });
  }

  ngOnDestroy() {
    if (this.gameTitle !== '') {
      this.clearGameAnswers()
    }
    this.gameTitle = '';
    this.game = null;
    this.resetGame()
  }

  getGame() {
    console.log(this.game_id)
    this.db.object(`games/${this.game_id}`).query.once('value')
      .then((game_ref: any) => {
        const game_db: Game = game_ref.val();
        const questions = game_db.answers;
        console.log(questions);
        let real_answers = []
        questions.forEach((answer: any) => {
          console.log(answer)
          const real_answer = new Answer(answer.display_text, answer.accepted_answers);
          console.log(real_answer)
          real_answers.push(real_answer);
        })
        game_db.answers = real_answers;
        console.log(game_db)
        this.game = game_db;
        this.ready = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  clearGameAnswers() {
    this.game.answers.forEach(answer => answer.guessed = false);
  }

  startGame() {
    this.ongoing = true;
    if (this.firstLoad) {
      this.firstLoad = false;
      this.initTimer()
    } else {
      this.game.answers.forEach(answer => answer.guessed = false);
      this.resetGame()
      this.initTimer()
    }

  }

  resetGame() {
    this.time = 60;
    this.play = true;
    this.guess = '';
    clearInterval(this.timer)
  }

  leaveGame() {
    this.clearGameAnswers();
    this.gameTitle = '';
    this.game = null;
    this.resetGame()
    this.back.emit();
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
    console.log(answerArr)
    let wasRight: boolean = false;
    answerArr.forEach((item: Answer) => {
      const rightTeam: boolean = item.checkAnswer(this.guess.trim().toLowerCase());
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
    const left = this.game.answers.filter(answer => answer.guessed === false);
    if (left.length === 0) {
      console.log('Game over, all guessed')
    }
  }

  gameOver() {
    this.ongoing = false;
    this.gameInputEl.nativeElement.disabled = true;
    this.scoreGame = this.game.answers.filter(answer => answer.guessed === true).length;
    this.play = false;
    this.endGameModal.nativeElement.classList.add('is-active')
  }

  closeModal(goToList: boolean) {
    this.endGameModal.nativeElement.classList.remove('is-active');
    if (goToList) {
      this.leaveGame()
    }
  }

}
