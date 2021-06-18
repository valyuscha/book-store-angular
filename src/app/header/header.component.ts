import {Component} from '@angular/core';
import {AuthService, CartService, ModalsService} from 'services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public auth: AuthService, public modalsService: ModalsService, public cart: CartService) {
  }
}
