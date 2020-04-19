import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: BehaviorSubject<User | null> = new BehaviorSubject(null);
  public test: any;

  constructor(public afAuth: AngularFireAuth) {
    this.test = this.afAuth.authState.subscribe(
      (data: any) => {
        console.log(data);
        this.user.next(data);
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  logoutUser() {
    this.afAuth.auth.signOut()
  }
}
