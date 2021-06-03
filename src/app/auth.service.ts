import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this._isLoggedIn$.next(!!localStorage.getItem('token'));
  }

  get isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn$.asObservable();
  }

  login() {
    this._isLoggedIn$.next(true);
    localStorage.setItem('token', 'token');
    this.router.navigateByUrl('/catalog');
  }

  logout() {
    this._isLoggedIn$.next(false);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
