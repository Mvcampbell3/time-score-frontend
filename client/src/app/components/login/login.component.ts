import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  login: boolean = true;
  saveEmail: boolean = false;

  user: User | null;
  userSub: Subscription;

  constructor(public afAuth: AngularFireAuth, public userService: UserService) { }

  ngOnInit() {
    this.retrieveEmail();
    this.userSub = this.userService.user.subscribe(
      (user: User | null) => {
        this.user = user;
        console.log(user)
      }
    )
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
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
          .then(result => {
            console.log(result);
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
