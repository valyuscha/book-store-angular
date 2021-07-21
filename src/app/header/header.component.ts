import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ModalsService} from 'services';
import {Select} from '@ngxs/store';
import {AuthState, CartState} from 'state';
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
  @Select(CartState.getTotalCount) totalCount!: Observable<number>;

  constructor(public modalsService: ModalsService) {
  }
}
