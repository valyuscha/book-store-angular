import {Component, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
import {AuthService} from '../auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  subscription!: Subscription
  isLoggedIn = this.auth.isLoggedIn

  ngOnInit() {
    this.subscription = this.auth.changedIsLoggedIn
      .subscribe(
        (isLoggedIn: boolean) => this.isLoggedIn = isLoggedIn
      )
  }

  constructor(public auth: AuthService) {}
}
