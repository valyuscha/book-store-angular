import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {BehaviorSubject, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = localStorage.getItem('token')
  private _changedIsLoggedIn$ = new BehaviorSubject<boolean>(!!this.token)

  constructor(private router: Router) {}

  get changedIsLoggedIn(): Observable<boolean> {
    return this._changedIsLoggedIn$.asObservable()
  }

  login() {
    this._changedIsLoggedIn$.next(true)
    localStorage.setItem('token', 'token')
    this.router.navigateByUrl('/catalog')
  }

  logout() {
    this._changedIsLoggedIn$.next(false)
    localStorage.removeItem('token')
  }
}
