import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private base_url: string = 'https://more-testing-firebase.firebaseio.com/';

  constructor(
    private _http: HttpClient
  ) { }

  testPost() {
    return this._http.post(`${this.base_url}/api.json`, { name: 'Michael', ok: true })
  }

  createUserDB(id, email, username) {
    return this._http.post(`${this.base_url}/users/${id}.json`, { email, username, created: moment().format('X') })
  }

  getUserDB(id) {
    return this._http.get(`${this.base_url}/users/${id}`);
  }
}
