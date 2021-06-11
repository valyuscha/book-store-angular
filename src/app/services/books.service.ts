import { Injectable } from '@angular/core';
import {IDefaultBook} from '../interfaces';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private _allBooks: IDefaultBook[] = [];
  private _booksForRender$ = new BehaviorSubject<IDefaultBook[]>([]);

  get allBooks(): IDefaultBook[] {
    return this._allBooks;
  }

  get booksForRender$(): BehaviorSubject<IDefaultBook[]> {
    return this._booksForRender$;
  }

  setBooksForRender(books: IDefaultBook[]) {
    this._booksForRender$.next(books);
  }

  setAllBooks(books: IDefaultBook[]) {
    this._allBooks = books;
  }
}
