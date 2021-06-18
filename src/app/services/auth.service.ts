import {Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';

import {IUser} from 'interfaces';
import {ApiService} from './api.service';
import {CartService} from './cart.service';
import {LoaderService} from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private _userInfo$ = new ReplaySubject<IUser>();
  private _isServerErrorMessageVisible$ = new BehaviorSubject(false);
  private _serverErrorMessage$ = new BehaviorSubject('');
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private api: ApiService, private cart: CartService, private loader: LoaderService) {
    this.setUserInfo();
  }

  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$.asObservable();
  }

  get userInfo$(): Observable<IUser> {
    return this._userInfo$.asObservable();
  }

  get isServerErrorMessageVisible$(): Observable<boolean> {
    return this._isServerErrorMessageVisible$.asObservable();
  }

  get serverErrorMessage$(): Observable<string> {
    return this._serverErrorMessage$.asObservable();
  }

  ngOnInit() {
    this.setUserInfo();
  }

  showServerErrorMessage() {
    this._isServerErrorMessageVisible$.next(true);
  }

  hideServerErrorMessage() {
    this._isServerErrorMessageVisible$.next(false);
  }

  login(userName: string) {
    return this.api.login(userName)
      .subscribe(response => {
        localStorage.setItem('userInfo', JSON.stringify(response));
        if (response) {
          this.setUserInfo();
          this.router.navigateByUrl('/catalog');
        }
      }, error => {
        this._serverErrorMessage$.next(error.message);
        this.showServerErrorMessage();
      });
  }

  logout() {
    this._isLoggedIn$.next(false);
    localStorage.removeItem('userInfo');
    this.router.navigateByUrl('/login');
    this.cart.clear();
    this.loader.stopLoading();
  }

  setUserInfo() {
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      this._userInfo$.next(JSON.parse(userInfo));
      this._isLoggedIn$.next(!!this._userInfo$.pipe(map(userInfo => !!userInfo.token)));
    }
  }
}
