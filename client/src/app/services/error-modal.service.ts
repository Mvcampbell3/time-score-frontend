import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {

  public error_display: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public error_title: string = '';
  public error_content: string = '';
  public error_redirect: boolean = false;

  constructor() { }

  public createErrorDisplay(title: string, content: string, loading: boolean, redirect: boolean) {
    this.error_title = title;
    this.error_content = content;
    // if (loading) {
    //   this.loadingService.loading.next(false);
    // }
    if (redirect) {
      // button will run a redirect
      this.error_redirect = true;
    } else {
      // button will close the modal
      this.error_redirect = false;
    }
    this.error_display.next(true);
  }

  public clearErrorDisplay() {
    this.error_title = '';
    this.error_content = '';
    this.error_redirect = false;
    this.error_display.next(false);
  }
}
