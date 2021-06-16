import {Component} from '@angular/core';
import {AuthService, CartService, ModalsService} from 'services';
import {IUser} from 'interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userInfo: IUser = {username: '', avatar: '', token: ''};

  constructor(public auth: AuthService, public modalsService: ModalsService, public cart: CartService) {
    this.auth.userInfo$.subscribe(userInfo => this.userInfo = userInfo);
  }
}
