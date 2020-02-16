import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy {

  gamesArray: string[] = ['MLB Teams', 'NFL Teams', 'U.S. Presidents'];
  selected: boolean = false;
  selectedGame: string = '';

  @ViewChild('listbg', { static: false }) listbg: ElementRef;


  bgClasses: string[] = ['newBG1', 'newBG2', 'newBG3'];
  pos: number = 1;
  timerPlace: any;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.setBackgroundColor(0);
    }, 50)
    this.startTimer();
  }

  startTimer() {
    this.timerPlace = setInterval(() => {
      if (this.pos < this.bgClasses.length) {
        this.setBackgroundColor(this.pos);
        this.pos++;
      } else {
        this.pos = 0;
        this.setBackgroundColor(this.pos);
        this.pos++;
      }
    }, 6000)
  }

  ngOnDestroy() {
    this.timerPlace = null;
  }

  selectGame(gameName) {
    this.selectedGame = gameName;
    clearInterval(this.timerPlace);
    this.selected = true;
  }

  setBackgroundColor(num: number) {
    this.listbg.nativeElement.classList = 'list-bg';
    this.listbg.nativeElement.classList.add(this.bgClasses[num]);
  }

  returnFromGame() {
    this.selectedGame = '';
    this.selected = false;
    this.startTimer()
  }
}
