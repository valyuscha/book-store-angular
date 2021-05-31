import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = true

  changedIsLoggedIn = new Subject<boolean>()

  login() {
    this.isLoggedIn = true
    this.changedIsLoggedIn.next(this.isLoggedIn)
  }

  logout() {
    this.isLoggedIn = false
    this.changedIsLoggedIn.next(this.isLoggedIn)
  }
}
