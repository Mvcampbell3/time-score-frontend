import { Component, OnInit, Input } from '@angular/core';
import { ErrorModalService } from 'src/app/services/error-modal.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {

  @Input() error_title: string;
  @Input() error_message: any;

  @Input() display_error: boolean;

  constructor(
    public errorService: ErrorModalService
  ) { }

  ngOnInit() {
  }

  closeError() {
    this.errorService.clearErrorDisplay();
  }

}
