import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IDefaultBook, IUser} from 'interfaces';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  get isLoading$(): BehaviorSubject<boolean> {
    return this._isLoading$;
  }

  startLoading() {
    this._isLoading$.next(true);
  }

  stopLoading() {
    this._isLoading$.next(false);
  }

  login(userName: string) {
    const userData: { username: string } = {
      username: userName
    };
    return this.http.post<IUser>(
      'https://js-band-store-api.glitch.me/signin',
      userData
    )
  }

  getAllBooks() {
    const userInfo = localStorage.getItem('userInfo');
    let token = '';
    if (userInfo) {
      token =  JSON.parse(userInfo).token
    }

    return this.http.get<IDefaultBook[]>(
      'https://js-band-store-api.glitch.me/books',
      {
        headers: new HttpHeaders({"Authorization": `Bearer ${token}`})
      }
    )
  }
}
