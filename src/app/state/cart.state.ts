import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Add, Edit, Remove, Clear, Purchase} from 'actions';
import {BookInfo} from 'globalTypes';
import {Injectable} from '@angular/core';
import {
  chooseBooksAmount,
  countAllBooks,
  countTotalPriceOfAllBooks,
  countTotalPriceOfSameBooks
} from 'utils';
import {ApiService, LocalStorageService} from 'services';
import {ICartBook} from 'interfaces';

export class CartStateModel {
  books!: BookInfo;
}

const cart = localStorage.getItem('cart');

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    books: cart ? JSON.parse(cart).books : {}
  }
})
@Injectable()
export class CartState {
  constructor(private localStorage: LocalStorageService, private api: ApiService) {
  }

  @Selector()
  static getBooks(state: CartStateModel): ICartBook[] {
    return Object.keys(state.books).map(key => state.books[key]);
  }

  @Selector()
  static getTotalCount(state: CartStateModel) {
    return Object.keys(state.books).map(key => state.books[key])
      .reduce((current, item) => current + item.addedCount, 0);
  }

  @Selector()
  static getTotalPrice(state: CartStateModel) {
    return Object.keys(state.books).map(key => state.books[key])
      .reduce((current, item) => Math.round((current + item.addedCount * item.price) * 100) / 100, 0);
  }

  @Action(Add)
  add({getState, patchState}: StateContext<CartStateModel>, {payload}: Add) {
    const books = {...getState().books};
    const activeBook = payload.book;

    if (books[payload.book.id]) {
      books[payload.book.id].addedCount += payload.addedCount;
    } else {
      books[payload.book.id] = {
        id: activeBook.id,
        title: activeBook.title,
        price: activeBook.price,
        availableCount: activeBook.count,
        // canUserIncreaseBooksCount: payload.addedCount !== activeBook.count,
        // canUserDecreaseBooksCount: payload.addedCount !== 1,
        addedCount: payload.addedCount,
        currentBookTotalPrice: payload.currentBookTotalPrice
      }
    }

    patchState({books});
    this.localStorage.set('cart', {books});
  }

  @Action(Edit)
  edit({getState, patchState}: StateContext<CartStateModel>, {payload}: Edit) {
    const books = getState().books;
    const bookInfo = {...books[payload.bookId]};
    const changedBooksDuplicatesAmount = chooseBooksAmount(bookInfo.addedCount, bookInfo.availableCount, payload.action);

    // bookInfo.canUserIncreaseBooksCount = changedBooksDuplicatesAmount !== bookInfo.availableCount;
    // bookInfo.canUserDecreaseBooksCount = changedBooksDuplicatesAmount !== 1;
    bookInfo.addedCount = changedBooksDuplicatesAmount;
    bookInfo.currentBookTotalPrice = countTotalPriceOfSameBooks(bookInfo.price, changedBooksDuplicatesAmount);

    const filteredBooksEntries = Object.entries(books)
      .filter(book => book[0] !== bookInfo.id);
    const filteredBooks = Object.fromEntries(filteredBooksEntries);
    const newBook = {[bookInfo.id]: bookInfo};
    patchState({books: {...filteredBooks, ...newBook}});

    this.localStorage.set('cart', {books: {...filteredBooks, ...newBook}});
  }

  @Action(Remove)
  remove({getState, patchState}: StateContext<CartStateModel>, {payload}: Remove) {
    const books = getState().books;
    const booksEntries = Object.entries(books);
    const filteredBooks = booksEntries.filter(book => +book[0] !== +payload);
    patchState({books: Object.fromEntries(filteredBooks)});

    this.localStorage.set('cart', {books: Object.fromEntries(filteredBooks)});
  }

  @Action(Clear)
  clear({patchState}: StateContext<CartStateModel>) {
    patchState({
      books: {}
    })

    this.localStorage.set('cart', {books: {}});
  }

  @Action(Purchase)
  purchase({getState}: StateContext<CartStateModel>) {
    const books: ICartBook[] = Object.entries(getState().books).map(book => {
      const bookInfo = {...book[1]};
      bookInfo.id = book[0];
      return bookInfo;
    });

    this.api.purchase(books).subscribe(res => {
      console.log('Response', res);
    });
  }
}
