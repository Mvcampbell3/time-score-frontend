import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorModalService } from 'src/app/services/error-modal.service';
import { HttpService } from 'src/app/services/http.service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output() displayLanding: EventEmitter<void> = new EventEmitter;

  email: string;
  password: string;
  action_login: boolean = true;
  saveEmail: boolean = false;
  username: string;

  user: User | null;
  userSub: Subscription;
  subscriptions: Subscription = new Subscription;
  exit_username: boolean = false;

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    public router: Router,
    public errorModal: ErrorModalService,
    public http: HttpService,
    public db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.retrieveEmail();
    this.userSub = this.userService.user.subscribe(
      (user: User | null) => {
        this.user = user;
        console.log(user)
      }
    )
    this.subscriptions.add(this.userSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toggleLogin() {
    this.action_login = !this.action_login;
  }

  handleLoginSignup() {
    console.log(this.action_login)
    if (this.email && this.password) {
      if (this.action_login) {
        this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
          .then(result => {
            console.log(result);
            this.router.navigate(['']);
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
          .then((result: any) => {
            console.log(result);
            this.db.object(`users/${result.user.uid}`).set(
              { email: this.email, username: this.username, created: moment().format('X') }
            )
              .then(() => {
                console.log('user set');
                this.router.navigate(['']);
              })
              .catch((err) => {
                console.log(err);
              })
          })
          .catch(err => {
            console.log(err)
          })
      }
    } else {
      console.log('need to enter email and password');
      this.errorModal.createErrorDisplay('Login Error', 'Please enter email and password', false, false);
    }

  }

  handleBack() {
    this.router.navigate(['/'])
  }

  toggleSavedEmail() {
    console.log(this.saveEmail)
    this.saveEmail = !this.saveEmail;
    if (this.saveEmail) {
      this.saveEmailStorage();
    } else {
      localStorage.removeItem('time-score-email');
      this.email = '';
    }
  }

  retrieveEmail() {
    const email = JSON.parse(localStorage.getItem('time-score-email'));
    console.log(email)
    if (!email) {
      this.saveEmail = false;
    } else {
      this.email = email;
      this.saveEmail = true;
    }
  }

  saveEmailStorage() {
    localStorage.setItem('time-score-email', JSON.stringify(this.email));
  }
}
