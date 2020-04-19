import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output() displayLanding: EventEmitter<void> = new EventEmitter;

  email: string;
  password: string;
  login: boolean = true;
  saveEmail: boolean = false;


  user: User | null;
  userSub: Subscription = this.userService.user.subscribe(
    (user: User | null) => {
      this.user = user;
      console.log(user)
    }
  )
  subscriptions: Subscription = new Subscription;

  constructor(public afAuth: AngularFireAuth, public userService: UserService, public router: Router) { }

  ngOnInit() {
    this.retrieveEmail();
    this.subscriptions.add(this.userSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toggleLogin() {
    this.login = !this.login
  }

  handleLoginSignup() {
    console.log(this.login)
    if (this.email && this.password) {
      if (this.login) {
        this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
          .then(result => {
            console.log(result);
            this.displayLanding.emit()
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
          .then(result => {
            console.log(result);
            this.displayLanding.emit()
          })
          .catch(err => {
            console.log(err)
          })
      }
    } else {
      console.log('need to enter email and password')
    }

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
