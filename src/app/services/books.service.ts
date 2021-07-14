import {Injectable} from '@angular/core';
import {IDefaultBook} from 'interfaces';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api.service';

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

  loadBooks() {
    this.api.getAllBooks().subscribe(books => {
      this._allBooks = books;
      this._booksForRender$.next(books);
    });
  }

  setBooksForRender(books: IDefaultBook[]) {
    this._booksForRender$.next(books);
  }
}
