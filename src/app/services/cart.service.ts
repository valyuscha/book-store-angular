import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AddRemoveBookFromCartAction, BookInfo} from 'globalTypes';
import {ICartBook, IDefaultBook} from 'interfaces';
import {
  chooseBooksAmount,
  countAllBooks,
  countTotalPriceOfAllBooks,
  countTotalPriceOfSameBooks
} from 'utils';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private books: BookInfo = {};
  private _books$ = new BehaviorSubject<BookInfo>({});

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cart = JSON.parse(storedCart);
      this._books$.next(cart.books);
      this.books = cart.books;
      this._totalPrice$.next(cart.totalPrice);
      this._totalCount$.next(cart.totalCount);
    } else {
      localStorage.setItem('cart', JSON.stringify({books: {}, totalPrice: 0, totalCount: 0}));
    }
  }

  private _totalPrice$ = new BehaviorSubject<number>(0);

  get totalPrice$(): BehaviorSubject<number> {
    return this._totalPrice$;
  }

  private _totalCount$ = new BehaviorSubject<number>(0);

  get totalCount$(): BehaviorSubject<number> {
    return this._totalCount$;
  }

  get books$(): Observable<BookInfo> {
    return this._books$.asObservable();
  }

  changeBooksData() {
    const booksValues = Object.values(this.books);
    const changedTotalPrice = countTotalPriceOfAllBooks(booksValues);
    const changedTotalCount = countAllBooks(booksValues);

    this._totalPrice$.next(changedTotalPrice);
    this._totalCount$.next(changedTotalCount);

    localStorage.setItem('cart', JSON.stringify({
      books: this.books,
      totalPrice: changedTotalPrice,
      totalCount: changedTotalCount
    }));
  }

  add(book: IDefaultBook, addedCount: number, currentBookTotalPrice: number) {
    const booksIds = Object.keys(this.books);

    const newBook: ICartBook = {
      id: book.id,
      title: book.title,
      price: book.price,
      availableCount: book.count,
      canUserIncreaseBooksCount: addedCount !== book.count,
      canUserDecreaseBooksCount: addedCount !== 1,
      addedCount,
      currentBookTotalPrice
    };

    if (booksIds) {
      if (!this.books[book.id]) {
        this.books[book.id] = {...newBook};
        this._books$.next(this.books);
      } else {
        const addedBook = {...this.books[book.id]};
        addedBook.addedCount += addedCount;
        addedBook.currentBookTotalPrice = countTotalPriceOfSameBooks(addedBook.price, addedBook.addedCount);
        addedBook.canUserIncreaseBooksCount = addedBook.addedCount !== addedBook.availableCount;
        addedBook.canUserDecreaseBooksCount = addedBook.addedCount !== 1;

        const filteredBooksEntries = Object.entries(this.books)
          .filter(book => book[0] !== addedBook.id);
        const filteredBooks = Object.fromEntries(filteredBooksEntries);
        const newBook = {[addedBook.id]: addedBook};

        this._books$.next({...filteredBooks, ...newBook});
        this.books[book.id] = addedBook;
      }
    } else {
      this.books[book.id] = {...newBook};
      this._books$.next(this.books);
    }

    this.changeBooksData();
  }

  remove(bookId: string) {
    const booksEntries = Object.entries(this.books);
    const filteredBooks = booksEntries.filter(book => +book[0] !== +bookId);
    this._books$.next(Object.fromEntries(filteredBooks));

    this.changeBooksData();
  }

  edit(bookId: string, action: AddRemoveBookFromCartAction) {
    const bookInfo = {...this.books[bookId]};
    const changedBooksDuplicatesAmount = chooseBooksAmount(bookInfo.addedCount, bookInfo.availableCount, action);

    bookInfo.canUserIncreaseBooksCount = changedBooksDuplicatesAmount !== bookInfo.availableCount;
    bookInfo.canUserDecreaseBooksCount = changedBooksDuplicatesAmount !== 1;
    bookInfo.addedCount = changedBooksDuplicatesAmount;
    bookInfo.currentBookTotalPrice = countTotalPriceOfSameBooks(bookInfo.price, changedBooksDuplicatesAmount);

    const filteredBooksEntries = Object.entries(this.books)
      .filter(book => +book[0] !== +bookInfo.id);
    const filteredBooks = Object.fromEntries(filteredBooksEntries);
    const newBook = {[bookInfo.id]: bookInfo};

    this._books$.next({...filteredBooks, ...newBook});

    this.changeBooksData();
  }

  clear() {
    this._books$.next({});
    this.books = {};
    this._totalPrice$.next(0);
    this._totalCount$.next(0);

    localStorage.setItem('cart', JSON.stringify({books: {}, totalPrice: 0, totalCount: 0}));
  }
}
