import { Component, ViewChild, ElementRef } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from 'firebase'
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('navBurger', { static: true }) navBurger: ElementRef;
  @ViewChild('navMenu', { static: true }) navMenu: ElementRef;

  showLanding: boolean = true;
  showGameList: boolean = false;
  showInstructions: boolean = false;

  displayPage: string = 'landing';

  user: User | null;
  userSub: Subscription = this.userService.user.subscribe(
    (user: User | null) => {
      this.user = user;
      console.log(user)
    }
  );

  constructor(public userService: UserService, public db: AngularFireDatabase) {
  }

  setDisplay(page) {
    this.displayPage = page;
    this.shutNavMobile()
  }

  shutNavMobile() {
    this.navBurger.nativeElement.classList.remove('is-active');
    this.navMenu.nativeElement.classList.remove('is-active');
  }

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

  logoutUser() {
    this.userService.logoutUser()
  }

  testingGameCreate() {
    console.log('running game test create')
    this.db.list('games').push({
      title: 'Test Game',
      input_placeholder: 'baseball football hockey',
      description: 'This is just a test',
      instructions: 'Still just a test game',
      questions: [
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