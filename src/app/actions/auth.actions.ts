import {IUser} from 'interfaces';

export class SetUserInfo {
  static readonly type = '[AUTH] set user info';

  constructor(public payload: IUser | null) {
  }
}

export class Login {
  static readonly type = '[AUTH] login'

  constructor(public payload: string) {
  }
}

export class Logout {
  static readonly type = '[AUTH] logout'
}
