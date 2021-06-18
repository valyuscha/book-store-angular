import {Injectable} from '@angular/core';
import {IDefaultBook} from 'interfaces';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private _booksForRender$ = new BehaviorSubject<IDefaultBook[]>([]);
  private _allBooks: IDefaultBook[] = [];

  constructor(private api: ApiService, private auth: AuthService) {
    this.api.getAllBooks().subscribe(books => {
      this._allBooks = books;
      this._booksForRender$.next(books);
    }, () => this.auth.logout());
  }

  get allBooks(): IDefaultBook[] {
    return this._allBooks;
  }

  get booksForRender$(): BehaviorSubject<IDefaultBook[]> {
    return this._booksForRender$;
  }

  setBooksForRender(books: IDefaultBook[]) {
    this._booksForRender$.next(books);
  }
}
