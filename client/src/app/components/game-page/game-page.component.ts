import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy, NgZone } from '@angular/core';
import { Game } from '../../models/game';
import { Answer } from '../../models/answer';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})

export class GamePageComponent implements OnInit, OnDestroy {
  @ViewChild('gameInput', { static: false }) gameInputEl: ElementRef;
  @Input() gameTitle: string;
  @Output() back: EventEmitter<void> = new EventEmitter;

  game: Game;
  guess: string;
  timer: any;
  time: number = 60;
  scoreGame: number = 0;
  play: boolean = true;
  firstLoad: boolean = true;
  ongoing: boolean = false;

  prev_score: any;

  ready: boolean = false;

  game_id: string;

  base_score: number = 100;
  score_total: number;

  user: User;
  user_sub: Subscription;
  can_score: boolean = false;

  show_end_modal: boolean = false;

  subscriptions: Subscription = new Subscription();

  constructor(
    public db: AngularFireDatabase,
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public ngZone: NgZone
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      this.game_id = params.params.id;
      this.getGame();
      this.setUser();
    });
  }

  setUser() {
    this.user_sub = this.userService.user.subscribe(
      (user: User) => {
        this.user = user;
        console.log(user)
        if (user) {
          this.can_score = true;
        } else {
          this.can_score = false;
        }
      },
      (err: any) => {
        console.log(err);
      }
    )
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
    this.db.object(`games/${this.game_id}`).query.once('value')
      .then((game_ref: any) => {
        const game_db: Game = game_ref.val();
        const questions = game_db.answers;
        let real_answers = []
        questions.forEach((answer: any) => {
          const real_answer = new Answer(answer.display_text, answer.accepted_answers);
          real_answers.push(real_answer);
        })
        game_db.answers = real_answers;
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
    this.router.navigate([`/gameinfo/${this.game_id}`])
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
    let checked = 0;
    let left_to = answerArr.length;
    answerArr.forEach((item: Answer) => {
      checked++;
      const rightTeam: boolean = item.checkAnswer(this.guess.trim().toLowerCase());
      if (rightTeam && wasRight === false) {
        wasRight = true
        console.log(wasRight)
      }
      if (checked === left_to) {
        console.log('looped')
        if (wasRight) {
          setTimeout(() => {
            this.guess = '';
            this.clearInput();
          }, 5)
        }
      }
    })

  }

  clearInput() {
    console.log('running clear Input')
    this.guess = '';
    const left = this.game.answers.filter(answer => answer.guessed === false);
    if (left.length === 0) {
      console.log('Game over, all guessed')
      this.gameOver()
    }
  }

  gameOver() {
    this.ongoing = false;
    this.gameInputEl.nativeElement.disabled = true;
    this.play = false;
    clearInterval(this.timer);
    this.endScoring()
  }

  endScoring() {
    const time_left = this.time;
    this.scoreGame = [...this.game.answers].filter(answer => answer.guessed === true).length;
    let perc_right = Number((this.scoreGame / this.game.answers.length).toFixed(4)) * 100;
    let score_start = perc_right * this.base_score;
    const inv_time = 60 - time_left;
    let time_score = inv_time * 10;
    this.score_total = score_start - time_score;

    console.log(this.score_total);

    const new_plays = this.game.plays + 1;
    const new_total = this.game.total_score + this.score_total;

    this.db.object(`games/${this.game_id}`).update({ plays: new_plays, total_score: new_total })
      .then(() => {
        console.log('game updated');
        if (this.can_score) {
          this.db.object(`games/${this.game_id}/highscores/${this.user.uid}`).query.once('value')
            .then((score_ref) => {
              const prev_score = score_ref.val();
              console.log(prev_score, typeof prev_score)
              if (prev_score) {
                this.prev_score = prev_score;
                if (prev_score.score < this.score_total) {
                  this.saveScore();
                } else {
                  console.log('score was not higher than prev score')
                  this.show_end_modal = true;
                }
              } else {
                console.log('no highscore for player')
                this.saveScore();
              }
            })
        } else {
          this.show_end_modal = true;
          console.log('can not save highscores')
        }
      })
      .catch(() => {
        console.log('game unable to be updated');
      })



  }

  saveScore() {

    let username;

    if (this.user.displayName !== null) {
      username = this.user.displayName
    } else {
      username = this.user.email.split('@')[0];
    }

    const game_score = {
      user_id: this.user.uid,
      date: moment().format('X'),
      score: this.score_total,
      username: username
    }

    const user_score = {
      game_title: this.game.title,
      date: moment().format('X'),
      score: this.score_total
    }

    const promise_arr = [
      this.db.object(`games/${this.game_id}/highscores/${this.user.uid}`).set(game_score),
      this.db.object(`users/${this.user.uid}/highscores/${this.game_id}`).set(user_score)
    ]

    Promise.all(promise_arr)
      .then(() => {
        console.log('highscores saved on user and game');
        this.show_end_modal = true;
      })
      .catch((err) => {
        console.log(err);
      })
  }


}
