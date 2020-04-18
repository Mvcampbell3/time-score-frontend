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

  public user: User | null;
  public userSub: Subscription;

  constructor(public userService: UserService) {
    this.userSub = this.userService.user.subscribe(
      (user: User | null) => {
        this.user = user;
        console.log(user)
      }
    )
  }

  setDisplay(page) {
    this.displayPage = page;
    this.shutNavMobile()
  }

  handlePageSend(e) {
    console.log(e)
  }

  shutNavMobile() {
    this.navBurger.nativeElement.classList.remove('is-active');
    this.navMenu.nativeElement.classList.remove('is-active');
  }

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }
}