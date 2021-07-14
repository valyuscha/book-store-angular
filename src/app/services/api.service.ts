import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICartBook, IDefaultBook, IUser} from 'interfaces';
import {ProgressIndicator} from 'decorators';
import {GlobalDataService} from './global-data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private globalData: GlobalDataService) {
  }

  @ProgressIndicator
  login(userName: string) {
    return this.http.post<IUser>(
      `${this.globalData.apiHost}/signin`,
      {username: userName}
    );
  }

  @ProgressIndicator
  getAllBooks() {
    return this.http.get<IDefaultBook[]>(`${this.globalData.apiHost}/books`);
  }

  @ProgressIndicator
  getCurrentBookInfo(bookId: number) {
    return this.http.get<IDefaultBook>(`${this.globalData.apiHost}/books/${bookId}`);
  }

  @ProgressIndicator
  purchase(booksList: ICartBook[]) {
    return this.http.post(
      `${this.globalData.apiHost}/books/purchase`,
      JSON.stringify({books: booksList})
    );
  }
}
