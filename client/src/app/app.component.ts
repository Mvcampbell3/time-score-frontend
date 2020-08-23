import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from 'firebase'
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { ErrorModalService } from './services/error-modal.service';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import us_pres_seed from './seeds/uspres';
import test_game from './seeds/testgame';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user: User | null;
  userSub: Subscription = this.userService.user.subscribe(
    (user: User | null) => {
      this.user = user;
    }
  );

  error_display_sub: Subscription;
  error_display: boolean = false;

  error_title: string;
  error_message: any;

  loading: boolean = false;
  loading_sub: Subscription;

  constructor(
    public userService: UserService,
    public db: AngularFireDatabase,
    public errorModal: ErrorModalService,
    public errorDialog: MatDialog,
    public loadingService: LoadingService
  ) {

  }

  ngOnInit() {
    // this.createPres();
    // this.createTestGame();
    this.error_display_sub = this.errorModal.error_display.subscribe(
      (er_disp: boolean) => {
        this.error_display = er_disp;
        if (er_disp) {
          this.handleErrorDisplay();
        }
      },
      (err: any) => {
        console.log(err);
      }
    )
    this.loading_sub = this.loadingService.loading.subscribe(
      (loading: boolean) => {
        this.loading = loading;
      }
    )
  }


  handleErrorDisplay() {
    this.errorDialog.open(ExampleDialog)
  }

  createPres() {
    console.log(us_pres_seed)
    const game_obj = { ...us_pres_seed, created: moment().format('X'), creator_id: 'Kw4gioehrngfqTgTOZpE9093d1e2' }
    this.db.list('games').push(game_obj)
      .then((result: any) => {
        this.db.object(`users/Kw4gioehrngfqTgTOZpE9093d1e2/games/${result.key}`).set('U.S. Presidents')
          .then((res => {
            console.log('game set')
          }))
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  createTestGame() {
    const game_obj = { ...test_game, created: moment().format('X'), creator_id: 'Kw4gioehrngfqTgTOZpE9093d1e2' }
    this.db.list('games').push(game_obj)
      .then((result: any) => {
        this.db.object(`users/Kw4gioehrngfqTgTOZpE9093d1e2/games/${result.key}`).set('Test Game')
          .then((res => {
            console.log('game set')
          }))
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

}


@Component({
  selector: 'dialog-example',
  templateUrl: 'example-dialog.html'
})
export class ExampleDialog { }