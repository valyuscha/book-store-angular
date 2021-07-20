import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICartBook, IDefaultBook, IUser} from 'interfaces';
import {ProgressIndicator} from 'decorators';
import {Select} from '@ngxs/store';
import {GlobalDataState} from 'state';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  @Select(GlobalDataState.getApiHost) apiHost$!: Observable<string>;
  private apiHost: string = '';

  constructor(private http: HttpClient) {
    this.apiHost$.subscribe(host => this.apiHost = host);
  }

  @ProgressIndicator
  login(userName: string) {
    return this.http.post<IUser>(
      `${this.apiHost}/signin`,
      {username: userName}
    );
  }

  @ProgressIndicator
  getAllBooks() {
    return this.http.get<IDefaultBook[]>(`${this.apiHost}/books`);
  }

  @ProgressIndicator
  getCurrentBookInfo(bookId: number) {
    return this.http.get<IDefaultBook>(`${this.apiHost}/books/${bookId}`);
  }

  @ProgressIndicator
  purchase(booksList: ICartBook[]) {
    return this.http.post(
      `${this.apiHost}/books/purchase`,
      JSON.stringify({books: booksList})
    );
  }
}
