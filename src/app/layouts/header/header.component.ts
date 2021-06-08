import {Component} from '@angular/core';
import {AuthService} from 'services';
import {IUser} from 'interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userInfo: IUser = {username: '', avatar: '', token: ''};

  constructor(public auth: AuthService) {
    this.auth.userInfo$.subscribe(userInfo => {
      this.userInfo = userInfo;
    });
  }
}
