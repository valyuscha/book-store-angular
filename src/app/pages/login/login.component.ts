import {Component} from '@angular/core';
import {AuthService} from 'services';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signInForm: FormGroup;
  isLoading = false;
  isServerErrorMessageVisible = false;
  serverErrorMessage = '';

  constructor(public auth: AuthService) {
    this.signInForm = new FormGroup({
      userName: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(16),
          this.noWhitespaceValidator.bind(this)
        ]
      )
    });

    this.auth.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading
    });

    this.auth.serverErrorMessage$.subscribe(message => {
      this.serverErrorMessage = message;
    });

    this.auth.isServerErrorMessageVisible$.subscribe(isVisible => {
      this.isServerErrorMessageVisible = isVisible;
    });
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    return !isWhitespace ? null : {'whitespace': true};
  }

  onSubmit() {
    if (!this.signInForm.valid) return;
    this.isLoading = true;
    this.auth.login(this.signInForm.getRawValue().userName)
    this.signInForm.reset();
  }

  closeErrorMessage() {
    this.isServerErrorMessageVisible = false;
  }
}
