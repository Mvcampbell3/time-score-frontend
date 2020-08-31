import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import * as moment from 'moment';
import { ErrorModalService } from 'src/app/services/error-modal.service';
import { User } from 'firebase';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy {

  selected: boolean = false;
  selectedGame: string = '';
  pos: number = 1;
  timerPlace: any;
  gamesArrayStore: any[] = [];
  gamesArrayDisplay: any[] = [];
  gamesSubscriptions: Subscription;
  subscriptions: Subscription = new Subscription();
  currentScreenWidth: any;
  search_term: string = '';
  games_loaded: boolean = false;
  user: User;
  user_subscription: Subscription;
  can_create: boolean = false;
  innerWidth: any;

  displayedColumns: string[];
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 700) {
      this.displayedColumns = ['title', 'plays', 'username']
    } else {
      this.displayedColumns = ['title', 'date', 'avg_score', 'plays', 'username'];
    }
  }

  constructor(
    public db: AngularFireDatabase,
    public router: Router,
    public loadingService: LoadingService,
    public errorService: ErrorModalService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.getUser();
    this.pipeGames()
  }

  getUser() {
    this.user_subscription = this.userService.user.subscribe(
      (user: User) => {
        this.user = user;
        if (user) {
          this.can_create = true;
        }
      }
    )
  }

  pipeGames() {
    this.gamesSubscriptions = this.db.object('games').snapshotChanges().pipe(
      (map((games_ref: any) => {
        const games_db = games_ref.payload.val();
        let games_arr = [];
        for (let game_id in games_db) {
          const game_obj = { ...games_db[game_id] };
          if (game_obj.plays > 0) {
            game_obj.avg_score = Number((game_obj.total_score / game_obj.plays).toFixed(0));
          } else {
            game_obj.avg_score = 0;
          }
          game_obj.id = game_id;
          game_obj.created_num = Number(game_obj.created);
          game_obj.formatted_date = moment(game_obj.created, 'X').format('MM/DD/YY');
          console.log(game_obj)
          games_arr.push(game_obj)
        }
        return games_arr;
      }))
    ).subscribe(
      (games_db: any) => {
        console.log(games_db)
        this.displayedColumns = ['title', 'date', 'avg_score', 'plays', 'username'];
        if (this.innerWidth < 700) {
          this.displayedColumns = ['title', 'plays', 'username']
        }
        this.gamesArrayDisplay = games_db;
        this.gamesArrayStore = games_db;
        this.games_loaded = true;
        this.loadingService.loading.next(false);
      },
      (err: any) => {
        console.log(err)
        this.errorService.createErrorDisplay('Game Retrieve Error', 'There was an error getting all of the games from the database', true, false)
      }
    )
    this.subscriptions.add(this.gamesSubscriptions);
  }

  handleSearch(e) {
    console.log(this.search_term);
    this.gamesArrayDisplay = [...this.gamesArrayStore].filter(game => game.title.toLowerCase().includes(this.search_term.toLowerCase()))
  }

  handleClear() {
    this.search_term = '';
    this.gamesArrayDisplay = [...this.gamesArrayStore]
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  selectGame(game) {
    this.selectedGame = game;
    console.log(game.id);
    this.router.navigate([`/gameinfo/${game.id}`])
  }

  handleBack() {
    this.router.navigate(['/'])
  }

  handleCreate() {
    this.router.navigate(['/create'])
  }

}
