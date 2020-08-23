import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

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
  gamesArrayDisplay: any[] = [];
  gamesSubscriptions: Subscription;
  subscriptions: Subscription = new Subscription();

  constructor(
    public db: AngularFireDatabase,
    public router: Router,
    public loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.pipeGames()
  }

  grabGames() {
    this.gamesSubscriptions = this.db.object('games').snapshotChanges().subscribe(
      (games_ref: any) => {
        const games_db = games_ref.payload.val();
        console.log(games_db);
      },
      (err: any) => {
        console.log(err);
      }
    )
    this.subscriptions.add(this.gamesSubscriptions)
  }

  pipeGames() {
    this.gamesSubscriptions = this.db.object('games').snapshotChanges().pipe(
      (map((games_ref: any) => {
        const games_db = games_ref.payload.val();
        let games_arr = [];
        for (let game_id in games_db) {
          games_arr.push({ ...games_db[game_id], id: game_id })
        }
        return games_arr;
      }))
    ).subscribe(
      (games_db: any) => {
        console.log(games_db)
        this.gamesArrayDisplay = games_db;
      },
      (err: any) => {
        console.log(err)
      }
    )
    this.subscriptions.add(this.gamesSubscriptions);
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
