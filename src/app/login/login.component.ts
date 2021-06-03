import {Component} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isValid = false;
  isTouched = false;

  constructor(public auth: AuthService) {
  }
}
