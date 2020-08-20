import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  @Output() landingClick: EventEmitter<void> = new EventEmitter;

  user: User | null;
  userSub: Subscription;




  move_bg: boolean = false;
  move_wrapper: boolean = false;
  move_text: boolean = false;

  subscriptions: Subscription = new Subscription();

  constructor(
    public router: Router,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.setUser();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setUser() {
    this.userSub = this.userService.user.subscribe(
      (user: User) => {
        this.user = user;
      }
    )
    this.subscriptions.add(this.userSub);
  }

  handleOut(link) {
    console.log('clicked')
    setTimeout(() => {
      this.move_bg = true;
      console.log('move_bg')
    }, 100);
    setTimeout(() => {
      this.move_wrapper = true
    }, 150)
    setTimeout(() => {
      this.move_text = true;
    }, 200);
    setTimeout(() => {
      this.router.navigate([`/${link}`])
    }, 850)
  }

}
