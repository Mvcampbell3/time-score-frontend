import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ErrorModalService } from 'src/app/services/error-modal.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit, OnDestroy {

  @Output() sendToPage: EventEmitter<string> = new EventEmitter;

  show_pro: boolean = false;

  user: User;
  user_sub: Subscription;

  constructor(
    public userService: UserService,
    public router: Router,
    public loadingService: LoadingService,
    public errorService: ErrorModalService
  ) { }

  ngOnInit() {
    this.user_sub = this.userService.user.subscribe(
      (user: User) => {
        this.user = user;
        if (user) {
          this.show_pro = true;

        }
      }
    )
  }

  ngOnDestroy() {
    this.user_sub.unsubscribe();
  }

  handleAction(dest) {
    this.router.navigate([`/${dest}`])
  }

  toHomePage() {
    this.sendToPage.emit('landing')
  }

  toGamesList() {
    this.sendToPage.emit('list');
  }

}
