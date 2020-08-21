import { Component, ViewChild, ElementRef } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from 'firebase'
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { ErrorModalService } from './services/error-modal.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user: User | null;
  userSub: Subscription = this.userService.user.subscribe(
    (user: User | null) => {
      this.user = user;
      console.log(user)
    }
  );

  error_display_sub: Subscription;
  error_display: boolean = false;

  error_title: string;
  error_message: any;

  constructor(
    public userService: UserService,
    public db: AngularFireDatabase,
    public errorModal: ErrorModalService,
    public errorDialog: MatDialog
  ) {
    this.error_display_sub = this.errorModal.error_display.subscribe(
      (er_disp: boolean) => {
        console.log(er_disp);
        this.error_display = er_disp;
        if (er_disp) {
          this.handleErrorDisplay();
        }
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  logoutUser() {
    this.userService.logoutUser()
  }

  handleErrorDisplay() {
    this.errorDialog.open(ExampleDialog)
  }

  testingGameCreate() {
    console.log('running game test create')
    this.db.list('games').push({
      title: 'Test Game',
      input_placeholder: 'baseball football hockey',
      description: 'This is just a test',
      instructions: 'Still just a test game',
      answers: [
        { display_text: 'Baseball', accepted_answers: ['baseball', 'basebal'] },
        { display_text: 'Football', accepted_answers: ['football', 'Football'] },
        { display_text: 'Hockey', accepted_answers: ['hockey', 'Hockey'] },
      ]
    })
      .then((result) => {
        console.log(result);
      })
      .catch(err => {
        console.log(err)
      })
  }

  testingGameGet() {
    console.log('running game test get');
    this.db.list('games').query.once('value')
      .then(result => {
        console.log(result);
        result.forEach(game => {
          console.log(game)
          console.log(game.val())
        })
      })
      .catch(err => {
        console.log(err)
      })
  }


}

@Component({
  selector: 'dialog-example',
  templateUrl: 'example-dialog.html'
})
export class ExampleDialog { }