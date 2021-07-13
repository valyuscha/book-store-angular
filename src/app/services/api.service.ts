import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICartBook, IDefaultBook, IUser} from 'interfaces';
import {ProgressIndicator} from 'decorators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  @ProgressIndicator
  login(userName: string) {
    return this.http.post<IUser>(
      'https://js-band-store-api.glitch.me/signin',
      {username: userName}
    );
  }

  @ProgressIndicator
  getAllBooks() {
    return this.http.get<IDefaultBook[]>('https://js-band-store-api.glitch.me/books');
  }

  @ProgressIndicator
  getCurrentBookInfo(bookId: number) {
    return this.http.get<IDefaultBook>(`https://js-band-store-api.glitch.me/books/${bookId}`);
  }

  @ProgressIndicator
  purchase(booksList: ICartBook[]) {
    return this.http.post(
      'https://js-band-store-api.glitch.me/books/purchase',
      JSON.stringify({books: booksList})
    );
  }
}
