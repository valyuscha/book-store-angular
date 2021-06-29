import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IDefaultBook, IUser} from 'interfaces';
import {CatchError, SwitchLoader} from 'decorators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  @CatchError
  @SwitchLoader
  login(userName: string) {
    const userData: { username: string } = {
      username: userName
    };
    return this.http.post<IUser>(
      'https://js-band-store-api.glitch.me/signin',
      userData
    );
  }

  @CatchError
  @SwitchLoader
  getAllBooks() {
    const userInfo = localStorage.getItem('userInfo');
    let token = '';
    if (userInfo) {
      token = JSON.parse(userInfo).token;
    }

    return this.http.get<IDefaultBook[]>(
      'https://js-band-store-api.glitch.me/books',
      {
        headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
      }
    )
  }

  @CatchError
  @SwitchLoader
  getCurrentBookInfo(bookId: number) {
    const userInfo = localStorage.getItem('userInfo');
    let token = '';
    if (userInfo) {
      token = JSON.parse(userInfo).token;
    }

    return this.http.get<IDefaultBook>(
      `https://js-band-store-api.glitch.me/books/${bookId}`,
      {
        headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
      }
    );
  }
}
