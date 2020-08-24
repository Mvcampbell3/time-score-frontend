import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ErrorModalService } from 'src/app/services/error-modal.service';
import { LoadingService } from 'src/app/services/loading.service';

interface Game_Type {
  display: string,
  value: string
}

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

  selected_type: any;

  game_types: Game_Type[] = [
    { display: 'History', value: 'history' },
    { display: 'Movies & T.V.', value: 'movies' },
    { display: 'Music', value: 'music' },
    { display: 'Sports', value: 'sports' },
    { display: 'Video Games', value: 'video games' },
    { display: 'Other', value: 'other' }
  ]

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

  has_title: boolean = false;
  has_type: boolean = false;
  has_instructions: boolean = false;
  has_description: boolean = false;
  has_input_placeholder: boolean = false;
  has_answers: boolean = false;

  subscriptions: Subscription = new Subscription();

  constructor(
    public db: AngularFireDatabase,
    public userService: UserService,
    public router: Router,
    public errorService: ErrorModalService,
    public loadingService: LoadingService
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
    if (this.title && this.instructions && this.input_placeholder && this.description && this.selected_type && this.stored_answers.length > 0) {
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
    this.evalChange()
  }

  evalGame() {
    let messages = []
    if (this.title) {
      this.has_title = true;
    } else {
      this.has_title = false;
      messages.push('Missing game title');
    }
    if (this.description) {
      this.has_description = true;
    } else {
      this.has_description = false;
      messages.push('Missing description');
    }
    if (this.instructions) {
      this.has_instructions = true;
    } else {
      this.has_instructions = false;
      messages.push('Missing instructions');
    }
    if (this.input_placeholder) {
      this.has_input_placeholder = true;
    } else {
      this.has_input_placeholder = false;
      messages.push('Missing input placeholder');
    }
    if (this.selected_type) {
      this.has_type = true;
    } else {
      this.has_type = false;
      messages.push('Missing game category');
    }
    if (this.stored_answers.length > 0) {
      this.has_answers = true;
    } else {
      this.has_answers = false;
      messages.push('Game must have at least one answer');
    }
    if (messages.length > 0) {
      this.errorService.createErrorDisplay('Create Game Error', messages.join(', '), false, false);
    } else {
      this.handleCreate()
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
      total_score: 0,
      type: this.selected_type
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

  handleInstructions() {

  }
}
