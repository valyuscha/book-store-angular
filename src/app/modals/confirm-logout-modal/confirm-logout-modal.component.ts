import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthService, ModalsService} from 'services';

@Component({
  selector: 'app-confirm-logout-modal',
  templateUrl: './confirm-logout-modal.component.html',
  styleUrls: ['./confirm-logout-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmLogoutModalComponent {
  constructor(public modalsService: ModalsService, public auth: AuthService) {
  }
}
