import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {

  game_id: string;
  game_sub: Subscription;
  game: any;

  subscriptions: Subscription = new Subscription;
  constructor(public db: AngularFireDatabase, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      this.game_id = params.params.id;
      console.log(this.game_id);
      this.getGameInfo();
    });
  }

  getGameInfo() {
    this.game_sub = this.db.object(`games/${this.game_id}`).valueChanges().subscribe(
      (data: any) => {
        console.log(data);
        this.subscriptions.add(this.game_sub);
        this.game = data;
      },
      (err: any) => {
        console.log(err);
        this.game_sub.unsubscribe();
      }
    )
  }
}
