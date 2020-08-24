import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpService } from 'src/app/services/http.service';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { ErrorModalService } from 'src/app/services/error-modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;
  userSub: Subscription;
  user_db: any;
  subscriptions: Subscription = new Subscription;

  constructor(
    public userService: UserService,
    public http: HttpService,
    public db: AngularFireDatabase,
    public router: Router,
    public loadingService: LoadingService,
    public errorService: ErrorModalService
  ) { }

  ngOnInit() {
    // this.loadingService.loading.next(true);
    this.setUser();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setUser() {
    this.userSub = this.userService.user.subscribe(
      (user: User) => {
        console.log(user);
        this.user = user;
        if (this.user) {
          this.setUserDB();
        }
      },
      (err: any) => {
        console.log(err);
      }
    )
    this.subscriptions.add(this.userSub);
  }

  setUserDB() {
    this.db.object(`users/${this.user.uid}`).query.once('value')
      .then((user_ref) => {
        this.user_db = user_ref.val();
        console.log(this.user_db);
        this.loadingService.loading.next(false);
      })
      .catch((err: any) => {
        console.log(err);
      })
  }

  handleLogOut() {
    this.userService.logoutUser();
    this.router.navigate([''])
  }

}
