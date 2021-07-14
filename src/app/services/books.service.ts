import {Injectable} from '@angular/core';
import {IDefaultBook} from 'interfaces';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from './api.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private _booksForRender$ = new BehaviorSubject<IDefaultBook[]>([]);
  private _allBooks: IDefaultBook[] = [];

  constructor(private api: ApiService) {
  }

  get allBooks(): IDefaultBook[] {
    return this._allBooks;
  }

  get booksForRender$(): BehaviorSubject<IDefaultBook[]> {
    return this._booksForRender$;
  }

  loadBooks(): Observable<unknown> {
    return this.api.getAllBooks().pipe(tap(books => {
      this._allBooks = books;
      this._booksForRender$.next(books);
    }));
  }

  setBooksForRender(books: IDefaultBook[]) {
    this._booksForRender$.next(books);
  }
}
