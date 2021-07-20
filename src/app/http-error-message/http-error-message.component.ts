import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ServerErrorMessageState} from 'state';
import {Observable} from 'rxjs';
import {HideServerErrorMessage} from 'actions';

@Component({
  selector: 'app-http-error-message',
  templateUrl: './http-error-message.component.html',
  styleUrls: ['./http-error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpErrorMessageComponent {
  @Select(ServerErrorMessageState.getIsVisible) isVisible!: Observable<boolean>;

  constructor(public store: Store) {
  }

  hideErrorMessage() {
    this.store.dispatch(new HideServerErrorMessage());
  }
}
