import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CartService, ModalsService} from 'services';
import {Select} from '@ngxs/store';
import {AuthState} from 'state';
import {Observable} from 'rxjs';
import {IUser} from 'interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Select(AuthState.getIsLoggedIn) isLoggedIn!: Observable<boolean>;
  @Select(AuthState.getUserInfo) userInfo!: Observable<IUser>;

  constructor(public modalsService: ModalsService, public cart: CartService) {
  }
}
