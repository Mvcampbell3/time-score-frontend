import { Component, ViewChild, ElementRef } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from 'firebase'
import { Subscription } from 'rxjs';

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


  constructor(public userService: UserService) {
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
}