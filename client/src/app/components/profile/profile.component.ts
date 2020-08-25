import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpService } from 'src/app/services/http.service';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
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
            const game = { name: this.user_db.games[game_id], id: game_id };
            this.user_games.push(game);
          }
        }
        if (this.user_db.highscores) {
          for (let high_id in this.user_db.highscores) {
            const highscore = { ...this.user_db.highscores[high_id], id: high_id };
            this.user_highscores.push(highscore);
          }
        }
        this.user_highscores = this.user_highscores.sort((a, b) => b.score - a.score)
        console.log(this.user_games)
        console.log(this.user_highscores);
        this.loadingService.loading.next(false);
      })
      .catch((err: any) => {
        console.log(err);
        this.errorService.createErrorDisplay('Profile Error', 'There was an error accessing your profile', true, false);

      })
  }

  handleLogOut() {
    this.userService.logoutUser();
    this.router.navigate([''])
  }

  handleGameClick(game) {
    this.router.navigate([`/edit/${game.id}`])
  }

}
