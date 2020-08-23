import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})

export class CreateGameComponent implements OnInit {
  unready_1: boolean = true;
  first_step: boolean = true;
  unready_2: boolean = true;
  second_step: boolean = false;

  user: User;
  user_sub: Subscription;

  title: string = "";
  input_placeholder: string = "";
  instructions: string = "";
  description: string = "";

  display_text: string = "";
  acc_ans_1: string = "";
  acc_ans_2: string = "";
  acc_ans_3: string = "";

  stored_answers: any[] = [];

  subscriptions: Subscription = new Subscription();

  constructor(
    public db: AngularFireDatabase,
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    this.setUser()
  }

  setUser() {
    this.user_sub = this.userService.user.subscribe(
      (user: User) => {
        this.user = user;
        if (this.user) {
          // can create
        }
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  evalChange() {
    console.log(this.title, this.instructions, this.input_placeholder, this.description)
    if (this.title && this.instructions && this.input_placeholder && this.description) {
      this.unready_1 = false;
    } else {
      this.unready_1 = true;
    }
  }

  handleLeave() {
    this.router.navigate(['/list'])
  }

  handleNext() {
    this.first_step = false;
    this.second_step = true;
  }

  handleBack() {
    this.second_step = false;
    this.first_step = true;
  }

  addAnswer() {
    console.log(this.display_text, this.acc_ans_1, this.acc_ans_2, this.acc_ans_3)

    let answers = [];
    if (this.acc_ans_1) {
      answers.push(this.acc_ans_1);
    }
    if (this.acc_ans_2) {
      answers.push(this.acc_ans_2);
    }
    if (this.acc_ans_3) {
      answers.push(this.acc_ans_3);
    }
    if (answers.length > 0 && this.display_text) {
      const answer = { display_text: this.display_text, accepted_answers: answers }
      console.log(answer);
      this.stored_answers.push(answer);
      this.display_text = '';
      this.acc_ans_1 = ''
      this.acc_ans_2 = ''
      this.acc_ans_3 = ''
    }
    if (this.stored_answers.length > 0) {
      this.unready_2 = false;
    } else {
      this.unready_2 = true;
    }
  }

  handleCreate() {
    const game_obj = {
      title: this.title,
      input_placeholder: this.input_placeholder,
      description: this.description,
      instructions: this.instructions,
      creator_id: this.user.uid,
      created: moment().format('X'),
      answers: this.stored_answers,
      plays: 0,
      total_score: 0
    }
    this.db.list('games').push(game_obj)
      .then((result: any) => {
        console.log(result);
        this.db.object(`users/${this.user.uid}/games/${result.key}`).set(this.title)
          .then((res: any) => {
            console.log(res);
            this.router.navigate(['/list']);
          })
          .catch((err: any) => {
            console.log(err);
          })
      })
      .catch((err: any) => {
        console.log(err);
      })
  }

}
