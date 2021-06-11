import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService, AuthService} from 'services';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  signInForm: FormGroup;
  isLoading = false;
  isServerErrorMessageVisible = false;
  serverErrorMessage = '';

  constructor(public auth: AuthService, private api: ApiService) {
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

    this.auth.serverErrorMessage$.subscribe(message => this.serverErrorMessage = message);
    this.auth.isServerErrorMessageVisible$.subscribe(isVisible => this.isServerErrorMessageVisible = isVisible);
  }

  ngOnInit() {
    this.api.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
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
    this.api.startLoading();
    this.auth.login(this.signInForm.getRawValue().userName)
    this.signInForm.reset();
  }

  ngOnDestroy() {
    // this.api.isLoading$.unsubscribe();
    this.auth.serverErrorMessage$.unsubscribe();
    this.auth.isServerErrorMessageVisible$.unsubscribe();
  }
}
