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
import { LoadingService } from 'src/app/services/loading.service';

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
    public loadingService: LoadingService,
    public db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.retrieveEmail();
    this.userSub = this.userService.user.subscribe(
      (user: User) => {
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
    if (this.action_login) {
      if (this.email && this.password) {
        this.loadingService.loading.next(true);
        this.loginUser();
      } else {
        console.log('need to enter email and password');
        this.errorModal.createErrorDisplay('Login Error', 'Please enter email and password', false, false);
      }
    } else {
      if (this.email && this.username && this.password) {
        // this.signupUser();
        this.loadingService.loading.next(true);
        this.checkUsernames()
      } else {
        console.log('need to enter email, password, and username')
        this.errorModal.createErrorDisplay('Sign Up Error', 'Please enter email, username, and password', false, false);
      }
    }
  }

  loginUser() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(result => {
        console.log(result);
        this.loadingService.loading.next(false);
        this.router.navigate(['']);
      })
      .catch(err => {
        console.log(err)
        this.errorModal.createErrorDisplay('Login Error', err, true, false);
      })
  }

  checkUsernames() {
    this.db.object('usernames').query.once('value')
      .then((usernames_raw: any) => {
        const usernames_db = usernames_raw.val();
        console.log(usernames_db);
        let usernames = [];
        for (let id in usernames_db) {
          usernames.push(usernames_db[id]);
        }
        if (usernames.indexOf(this.username) === -1) {
          this.signupUser()
        } else {
          console.log('already exits');
          this.errorModal.createErrorDisplay('Username Error', 'That username is already in use.', true, false)
        }
      })
      .catch((err: any) => {

      })
  }

  signupUser() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((result: any) => {
        console.log(result);
        const user_db_obj = { email: this.email, username: this.username, created: moment().format('X') };

        let promise_arr = [
          this.db.object(`users/${result.user.uid}`).set(user_db_obj),
          this.db.object(`usernames/${result.user.uid}`).set(this.username)
        ]

        Promise.all(promise_arr).then(() => {
          console.log('user set');
          result.user.updateProfile({ displayName: this.username })
            .then(() => {
              this.loadingService.loading.next(false);
              this.router.navigate(['']);
            })
            .catch((err) => {
              console.log(err);
              this.errorModal.createErrorDisplay('Sign Up Error', err, true, false);
            })
        })
          .catch((err) => {
            console.log(err);
            this.errorModal.createErrorDisplay('Sign Up Error', err, true, false);

          })
      })
      .catch(err => {
        console.log(err)
        this.errorModal.createErrorDisplay('Sign Up Error', err, true, false);

      })
  }

  handleBack() {
    this.router.navigate(['/'])
  }

  toggleSavedEmail() {
    setTimeout(() => {
      console.log(this.saveEmail)
      if (this.saveEmail) {
        this.saveEmailStorage();
      } else {
        localStorage.removeItem('time-score-email');
        this.email = '';
      }
    }, 100)

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

  disabledReturn() {
    if (this.saveEmail) {
      return false;
    }
    if (this.email !== undefined && this.email !== "") {
      return false;
    }
    return true;
  }
}
