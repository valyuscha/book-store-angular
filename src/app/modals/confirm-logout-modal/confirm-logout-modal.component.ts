import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ModalsService} from 'services';
import {Store} from '@ngxs/store';
import {Logout} from 'actions';

@Component({
  selector: 'app-confirm-logout-modal',
  templateUrl: './confirm-logout-modal.component.html',
  styleUrls: ['./confirm-logout-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmLogoutModalComponent {
  constructor(public modalsService: ModalsService, private store: Store) {
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
