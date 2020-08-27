import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {

  public error_display: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public error_title: string = '';
  public error_message: string = '';
  public error_redirect: boolean = false;
  public error_loading: boolean = false;

  constructor(
    public loadingService: LoadingService,
    public router: Router
  ) { }

  public createErrorDisplay(title: string, message: string, loading: boolean, redirect: boolean) {
    this.error_title = title;
    this.error_message = message;
    if (loading) {
      this.error_loading = true;
      this.loadingService.loading.next(false);
    }
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
    this.error_message = '';
    if (this.error_loading) {
      this.loadingService.loading.next(false);
      this.error_loading = false;
    }
    if (this.error_redirect) {
      this.error_redirect = false;
      this.router.navigate(['/'])
    }

    this.error_display.next(false);
  }
}
