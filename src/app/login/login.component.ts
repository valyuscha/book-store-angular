import {Component} from '@angular/core';
import {AuthService, LoaderService} from 'services';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signInForm: FormGroup;

  constructor(public auth: AuthService, public loader: LoaderService) {
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
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    return !isWhitespace ? null : {'whitespace': true};
  }

  setLoginInputErrorMessage(): string {
    if (this.signInForm.get('userName')?.errors?.required) {
      return 'Enter your name';
    }

    if (this.signInForm.get('userName')?.errors?.whitespace) {
      return 'Your name cannot be empty';
    }

    if (this.signInForm.get('userName')?.errors?.minlength) {
      return 'Name is too short';
    }

    if (this.signInForm.get('userName')?.errors?.maxlength) {
      return 'Name is too long';
    }

    return 'Error'
  }

  onSubmit() {
    if (!this.signInForm.valid) return;
    this.loader.startLoading();
    this.auth.login(this.signInForm.getRawValue().userName)
    this.signInForm.reset();
  }
}
