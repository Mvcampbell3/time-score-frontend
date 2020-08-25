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
  ];

  editing: boolean = false;
  edit_id: string;

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

  display_create: boolean = true;

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
      const id_arr: string[] = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
      let temp_id_arr: string[] = [];
      for (let i = 0; i < 9; i++) {
        const ran_num = Math.floor((Math.random() * id_arr.length));
        temp_id_arr.push(id_arr[ran_num])
      }
      const answer = { display_text: this.display_text, accepted_answers: answers, id: temp_id_arr.join('') }
      console.log(answer);
      this.stored_answers.push(answer);
      this.clearAnswerInputs();
    }
    this.evalChange()
  }

  clearAnswerInputs() {
    this.display_text = '';
    this.acc_ans_1 = ''
    this.acc_ans_2 = ''
    this.acc_ans_3 = ''
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
    this.display_create = !this.display_create;
  }

  handleIconClick(action, answer) {
    switch (action) {
      case "up":
        this.moveUp(answer);
        break;
      case "down":
        this.moveDown(answer);
        break;
      case "edit":
        this.editAnswer(answer);
        break;
      case "del":
        this.delAnswer(answer);
        break;
      default:
        console.log('handleIconClick switch not working as expected')
    }
  }

  moveUp(answer) {
    const display_arr = [...this.stored_answers].map(ans => ans.id);
    const index = display_arr.indexOf(answer.id);
    console.log(index);
    if (index > 0) {
      const temp_ans = this.stored_answers[index - 1];
      this.stored_answers[index - 1] = answer;
      this.stored_answers[index] = temp_ans;
    }
  }

  moveDown(answer) {
    const display_arr = [...this.stored_answers].map(ans => ans.id);
    const index = display_arr.indexOf(answer.id);
    if (index < (display_arr.length - 1)) {
      const temp_ans = this.stored_answers[index + 1];
      this.stored_answers[index + 1] = answer;
      this.stored_answers[index] = temp_ans;
    }
  }

  editAnswer(answer) {
    console.log(answer);
    this.edit_id = answer.id;
    const display_arr = [...this.stored_answers].map(ans => ans.id);
    const index = display_arr.indexOf(answer.id);
    this.display_text = answer.display_text;
    answer.accepted_answers.forEach((answer, i) => {
      if (i === 0) {
        this.acc_ans_1 = answer;
      }
      if (i === 1) {
        this.acc_ans_2 = answer;
      }
      if (i === 2) {
        this.acc_ans_3 = answer
      }
    })
    this.editing = true;
  }

  delAnswer(answer) {
    const display_arr = [...this.stored_answers].map(ans => ans.id);
    const index = display_arr.indexOf(answer.id);
    this.stored_answers.splice(index, 1);
  }

  cancelEdit() {
    this.clearAnswerInputs();
    this.editing = false;
    this.edit_id = '';
  }

  confirmEdit() {
    console.log(this.edit_id);
    const index = [...this.stored_answers].map(answer => answer.id).indexOf(this.edit_id);
    console.log(index)

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

      const new_answer = { display_text: this.display_text, accepted_answers: answers, id: this.edit_id }
      this.stored_answers[index] = new_answer
      this.edit_id = '';
      this.clearAnswerInputs();
      this.editing = false;
    }
  }
}
