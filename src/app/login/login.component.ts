import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {LoaderState} from 'state';
import {Observable} from 'rxjs';
import {Login} from '../actions';

const errorMessages: {[key: string]: string} = {
  required: 'Enter your name',
  whitespace: 'Your name cannot be empty',
  minlength: 'Name is too short',
  maxlength: 'Name is too long'
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  @Select(LoaderState.getIsLoadingStatus) isLoading!: Observable<boolean>;
  signInForm: FormGroup;

  constructor(private store: Store) {
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
    const activeErrors = Object.keys(this.signInForm.get('userName')?.errors || {});
    if (activeErrors.length === 0) {
      return 'Error';
    }

    return errorMessages[activeErrors[0]];
  }

  onSubmit() {
    if (!this.signInForm.valid) return;
    this.store.dispatch(new Login((this.signInForm.getRawValue().userName)));
    this.signInForm.reset();
  }
}
