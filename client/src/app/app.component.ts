import { Component, ViewChild, ElementRef } from '@angular/core';

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

  gameListView() {
    this.shutNavMobile()
    this.showInstructions = false;
    this.showLanding = false;
    this.showGameList = true;
  }

  landingView() {
    this.shutNavMobile()
    this.showInstructions = false;
    this.showGameList = false;
    this.showLanding = true;
  }

  instructionsView() {
    this.shutNavMobile()
    this.showLanding = false;
    this.showGameList = false;
    this.showInstructions = true;
  }

  handlePageSend(where: string) {
    switch (where) {
      case 'home':
        this.landingView();
        break;
      case 'gamesList':
        this.gameListView();
        break;
      case 'instructions':
        this.instructionsView();
        break;
      default:
        this.landingView();
        console.log('handle page send switch not working as expected')
    }
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