import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from 'interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
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
}
