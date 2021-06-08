import {Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';

import {IUser} from 'interfaces';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  userInfo$ = new ReplaySubject<IUser>();
  isLoading$ = new BehaviorSubject<boolean>(false);
  isServerErrorMessageVisible$ = new BehaviorSubject(false);
  serverErrorMessage$ = new BehaviorSubject('');
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private api: ApiService) {
    this.setUserInfo();
  }

  get isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn$.asObservable();
  }

  ngOnInit() {
    this.setUserInfo();
  }

  login(userName: string) {
    this.isLoading$.next(true);
    return this.api.login(userName)
      .subscribe(response => {
        localStorage.setItem('userInfo', JSON.stringify(response));
        if (response) {
          this.setUserInfo();
          this._isLoggedIn$.next(true);
          this.isLoading$.next(false);
          this.router.navigateByUrl('/catalog');
        }
      }, error => {
        this.serverErrorMessage$.next(error.message);
        this.isServerErrorMessageVisible$.next(true);
        this.isLoading$.next(false);
      });
  }

  logout() {
    this._isLoggedIn$.next(false);
    localStorage.removeItem('userInfo');
    this.router.navigateByUrl('/login');
  }

  setUserInfo() {
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      this.userInfo$.next(JSON.parse(userInfo));
      this._isLoggedIn$.next(!!this.userInfo$.pipe(map(userInfo => !!userInfo.token)));
    }
  }
}
