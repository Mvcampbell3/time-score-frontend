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

  start_1: boolean = true;


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
    this.setAnimations()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setAnimations() {
    setTimeout(() => {
      this.start_1 = false;
    }, 800)
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

  setBG1() {
    const classes = {
      "bg-1": true,
      "start-1": this.start_1,
      "exit": this.move_bg
    }
    return classes;
  }

  setBG2() {
    const classes = {
      "bg-2": true,
      "start-2": this.start_1,
      "exit": this.move_bg
    }
    return classes;
  }

  setText() {
    const classes = {
      "landing-text": true,
      "start-text": this.start_1,
      "exit": this.move_text
    }
    return classes;
  }

  setWrapper() {
    const classes = {
      "landing-wrapper": true,
      "start-wrapper": this.start_1,
      "exit": this.move_wrapper
    }
    return classes;
  }
}
