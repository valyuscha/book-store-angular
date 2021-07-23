import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICartBook, IDefaultBook, IUser} from 'interfaces';
import {ProgressIndicator} from 'decorators';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {GlobalDataState} from 'state';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiHost: string = '';

  constructor(private http: HttpClient, store: Store) {
    store.select(GlobalDataState.getApiHost).subscribe(host => this.apiHost = host);
  }

  @ProgressIndicator
  login(userName: string): Observable<IUser> {
    return this.http.post<IUser>(
      `${this.apiHost}/signin`,
      {username: userName}
    );
  }

  @ProgressIndicator
  getAllBooks(): Observable<IDefaultBook[]> {
    return this.http.get<IDefaultBook[]>(`${this.apiHost}/books`);
  }

  @ProgressIndicator
  getCurrentBookInfo(bookId: number): Observable<IDefaultBook> {
    return this.http.get<IDefaultBook>(`${this.apiHost}/books/${bookId}`);
  }

  @ProgressIndicator
  purchase(booksList: ICartBook[]) {
    return this.http.post(
      `${this.apiHost}/purchase`,
      JSON.stringify({books: booksList})
    );
  }
}
