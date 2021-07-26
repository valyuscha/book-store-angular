import {State, Action, StateContext, Selector} from '@ngxs/store';
import {SetUserInfo, Login, Logout, HideLoader, Clear} from 'actions';
import {IUser} from 'interfaces';
import {ApiService, LocalStorageService} from 'services';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

const userInfo = localStorage.getItem('userInfo');

export class AuthStateModel {
  userInfo!: IUser | null;
  isLoggedIn!: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    userInfo: userInfo ? JSON.parse(userInfo) : {},
    isLoggedIn: userInfo ? !!JSON.parse(userInfo) : false
  }
})
@Injectable()
export class AuthState {
  constructor(
    private api: ApiService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  @Selector()
  static getUserInfo(state: AuthStateModel) {
    return state.userInfo;
  }

  @Selector()
  static getIsLoggedIn(state: AuthStateModel) {
    return state.isLoggedIn;
  }

  @Action(SetUserInfo)
  setUserInfo({patchState}: StateContext<AuthStateModel>, {payload}: SetUserInfo) {
    patchState({userInfo: payload})
  }

  @Action(Login)
  login({patchState, dispatch}: StateContext<AuthStateModel>, {payload}: Login) {
    return this.api.login(payload).pipe(
      tap(response => {
        this.localStorage.set('userInfo', response);
        this.router.navigateByUrl('/catalog');
        patchState({isLoggedIn: !!response.token})

        dispatch(new SetUserInfo(response));
      })
    );
  }

  @Action(Logout)
  logout({patchState, dispatch}: StateContext<AuthStateModel>) {
    this.localStorage.remove('userInfo');
    this.router.navigateByUrl('/login');
    dispatch(new Clear());
    dispatch(new HideLoader());
    patchState({isLoggedIn: false})
  }
}
