import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IDefaultBook, IUser} from 'interfaces';
import {LoaderService} from './loader.service';
import {tap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private loader: LoaderService) {
  }

  login(userName: string) {
    this.loader.startLoading();
    const userData: { username: string } = {
      username: userName
    };
    return this.http.post<IUser>(
      'https://js-band-store-api.glitch.me/signin',
      userData
    ).pipe(tap(() => {
      this.loader.stopLoading();
    }));
  }

  getAllBooks() {
    this.loader.startLoading();
    const userInfo = localStorage.getItem('userInfo');
    let token = '';
    if (userInfo) {
      token =  JSON.parse(userInfo).token;
    }

    return this.http.get<IDefaultBook[]>(
      'https://js-band-store-api.glitch.me/books',
      {
        headers: new HttpHeaders({"Authorization": `Bearer ${token}`})
      }
    ).pipe(tap(() => this.loader.stopLoading()));
  }

  getCurrentBookInfo(bookId: number) {
    this.loader.startLoading();
    const userInfo = localStorage.getItem('userInfo');
    let token = '';
    if (userInfo) {
      token = JSON.parse(userInfo).token;
    }

    return this.http.get<IDefaultBook>(
      `https://js-band-store-api.glitch.me/books/${bookId}`,
      {
        headers: new HttpHeaders({"Authorization": `Bearer ${token}`})
      }
    ).pipe(tap(() => this.loader.stopLoading()));
  }
}
