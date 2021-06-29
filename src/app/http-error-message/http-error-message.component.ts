import {Component} from '@angular/core';
import {ServerErrorMessageService} from 'services';

@Component({
  selector: 'app-http-error-message',
  templateUrl: './http-error-message.component.html',
  styleUrls: ['./http-error-message.component.scss']
})
export class HttpErrorMessageComponent {
  constructor(public serverError: ServerErrorMessageService) {
  }
}
