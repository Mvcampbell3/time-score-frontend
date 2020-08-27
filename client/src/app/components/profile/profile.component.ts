import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpService } from 'src/app/services/http.service';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import * as moment from 'moment';
import { ErrorModalService } from 'src/app/services/error-modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;
  userSub: Subscription;
  user_db: any;
  subscriptions: Subscription = new Subscription;

  user_highscores: any[] = [];
  user_games: any[] = [];
  games_loaded: boolean = false;

  display_games: any[] = [];
  display_scores: any[] = [];

  displayColumnsGames: string[] = ['title', 'date', 'avg_score', 'plays'];
  displayColumnsScores: string[] = ['game_title', 'score', 'date'];

  account_creation: string;
  innerWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 700) {
      this.displayColumnsGames = ['title', 'avg_score', 'plays']
    } else {
      this.displayColumnsGames = ['title', 'date', 'avg_score', 'plays'];
    }
  }


  constructor(
    public userService: UserService,
    public http: HttpService,
    public db: AngularFireDatabase,
    public router: Router,
    public loadingService: LoadingService,
    public errorService: ErrorModalService
  ) { }

  ngOnInit() {
    // this.loadingService.loading.next(true);
    this.setUser();

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setUser() {
    this.userSub = this.userService.user.subscribe(
      (user: User) => {
        console.log(user);
        this.user = user;
        if (this.user) {
          console.log(this.user.metadata)
          this.account_creation = moment(this.user.metadata.creationTime, 'ddd, D MMM YYYY HH:mm:ss').format('MM/DD/YY');
          this.setUserDB();
        }
      },
      (err: any) => {
        console.log(err);
      }
    )
    this.subscriptions.add(this.userSub);
  }

  setUserDB() {
    this.db.object(`users/${this.user.uid}`).query.once('value')
      .then((user_ref) => {
        this.user_db = user_ref.val();
        console.log(this.user_db);
        if (this.user_db.games) {
          for (let game_id in this.user_db.games) {
            const game: any = { title: this.user_db.games[game_id], id: game_id };
            this.user_games.push(game);
          }
        }
        if (this.user_db.highscores) {
          for (let high_id in this.user_db.highscores) {
            const highscore = { ...this.user_db.highscores[high_id], id: high_id };
            highscore.formatted_date = moment(highscore.date, 'X').format('MM/DD/YY');
            this.user_highscores.push(highscore);
          }
        }
        this.user_highscores = this.user_highscores.sort((a, b) => Number(b.date) - Number(a.date))
        console.log(this.user_games)
        console.log(this.user_highscores);

        if (this.user_games.length > 0) {
          this.getGames();
        } else {
          this.finsihedLoading();
        }
      })
      .catch((err: any) => {
        console.log(err);
        this.errorService.createErrorDisplay('Profile Error', 'There was an error accessing your profile', true, false);
      })
  }

  getGames() {
    let got_games: any[] = [];
    if (this.user_games.length > 0) {
      this.user_games.forEach(game => {
        this.db.object(`games/${game.id}`).query.once('value')
          .then((game_raw: any) => {
            const db_game = { ...game_raw.val(), id: game.id };
            console.log(db_game);
            if (db_game.plays > 0) {
              db_game.avg_score = Number((db_game.total_score / db_game.plays).toFixed(0))
            } else {
              db_game.avg_score = 0
            }
            db_game.formatted_date = moment(db_game.created, 'X').format('MM/DD/YY');
            got_games.push(db_game);
            if (got_games.length === this.user_games.length) {
              console.log(got_games);
              this.display_games = got_games;

              this.finsihedLoading();
            }
          })
          .catch((err: any) => {
            console.log(err);
            this.errorService.createErrorDisplay('Profile Error', 'There was an error accessing your profile', true, false);
          })
      })
    }
  }

  finsihedLoading() {
    this.games_loaded = true;
    this.loadingService.loading.next(false);
  }

  handleLogOut() {
    this.userService.logoutUser();
    this.router.navigate([''])
  }

  handleGameClick(game) {
    this.router.navigate([`/edit/${game.id}`])
  }

}
