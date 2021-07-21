import {State, Action, StateContext, Selector, createSelector} from '@ngxs/store';
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
  totalCount!: number;
  totalPrice!: number;
}

const cart = localStorage.getItem('cart');

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    books: cart ? JSON.parse(cart).books : {},
    totalCount: cart ? JSON.parse(cart).totalCount : 0,
    totalPrice: cart ? JSON.parse(cart).totalPrice : 0
  }
})
@Injectable()
export class CartState {
  constructor(private localStorage: LocalStorageService, private api: ApiService) {
  }

  private changeBooksData(books: BookInfo, patchState: (val: Partial<any>) => CartStateModel) {
    const booksValues = Object.values(books);
    const changedTotalPrice = countTotalPriceOfAllBooks(booksValues);
    const changedTotalCount = countAllBooks(booksValues);

    patchState({
      totalPrice: changedTotalPrice,
      totalCount: changedTotalCount
    })

    this.localStorage.set('cart', {
      books: books,
      totalPrice: changedTotalPrice,
      totalCount: changedTotalCount
    });
  }

  @Selector()
  static getBooks(state: CartStateModel) {
    return state.books;
  }

  @Selector()
  static getTotalCount(state: CartStateModel) {
    return state.totalCount;
  }

  @Selector()
  static getTotalPrice(state: CartStateModel) {
    return state.totalCount;
  }

  @Action(Add)
  add({getState, patchState}: StateContext<CartStateModel>, {payload}: Add) {
    const books = getState().books;
    const booksIds = Object.keys(books);
    const activeBook = payload.book;

    const newBook: ICartBook = {
      id: activeBook.id,
      title: activeBook.title,
      price: activeBook.price,
      availableCount: activeBook.count,
      canUserIncreaseBooksCount: payload.addedCount !== activeBook.count,
      canUserDecreaseBooksCount: payload.addedCount !== 1,
      addedCount: payload.addedCount,
      currentBookTotalPrice: payload.currentBookTotalPrice
    };

    if (booksIds) {
      if (!books[activeBook.id]) {
        books[activeBook.id] = {...newBook};
        patchState({books})
      } else {
        const addedBook = {...books[activeBook.id]};
        addedBook.addedCount += payload.addedCount;
        addedBook.currentBookTotalPrice = countTotalPriceOfSameBooks(addedBook.price, addedBook.addedCount);
        addedBook.canUserIncreaseBooksCount = addedBook.addedCount !== addedBook.availableCount;
        addedBook.canUserDecreaseBooksCount = addedBook.addedCount !== 1;

        const filteredBooksEntries = Object.entries(books)
          .filter(book => book[0] !== addedBook.id);
        const filteredBooks = Object.fromEntries(filteredBooksEntries);
        const newBook = {[addedBook.id]: addedBook};

        patchState({books: {...filteredBooks, ...newBook}})
      }
    } else {
      books[activeBook.id] = newBook;
      patchState({books})
    }

    this.changeBooksData(books, patchState)
  }

  @Action(Edit)
  edit({getState, patchState}: StateContext<CartStateModel>, {payload}: Edit) {
    const books = getState().books;
    const bookInfo = {...books[payload.bookId]};
    const changedBooksDuplicatesAmount = chooseBooksAmount(bookInfo.addedCount, bookInfo.availableCount, payload.action);

    bookInfo.canUserIncreaseBooksCount = changedBooksDuplicatesAmount !== bookInfo.availableCount;
    bookInfo.canUserDecreaseBooksCount = changedBooksDuplicatesAmount !== 1;
    bookInfo.addedCount = changedBooksDuplicatesAmount;
    bookInfo.currentBookTotalPrice = countTotalPriceOfSameBooks(bookInfo.price, changedBooksDuplicatesAmount);

    const filteredBooksEntries = Object.entries(books)
      .filter(book => book[0] !== bookInfo.id);
    const filteredBooks = Object.fromEntries(filteredBooksEntries);
    const newBook = {[bookInfo.id]: bookInfo};
    patchState({books: {...filteredBooks, ...newBook}});

    this.changeBooksData(books, patchState);
  }

  @Action(Remove)
  remove({getState, patchState}: StateContext<CartStateModel>, {payload}: Remove) {
    const books = getState().books;
    const booksEntries = Object.entries(books);
    const filteredBooks = booksEntries.filter(book => +book[0] !== +payload);
    patchState({books: Object.fromEntries(filteredBooks)});

    this.changeBooksData(books, patchState);
  }

  @Action(Clear)
  clear({patchState}: StateContext<CartStateModel>) {
    patchState({
      books: {},
      totalPrice: 0,
      totalCount: 0
    })

    this.localStorage.set('cart', {books: {}, totalPrice: 0, totalCount: 0});
  }

  @Action(Purchase)
  purchase({getState}: StateContext<CartStateModel>) {
    const books: ICartBook[] = Object.entries(getState().books).map(book => {
      const bookInfo = {...book[1]};
      bookInfo.id = book[0];
      return bookInfo;
    })

    this.api.purchase(books).subscribe(res => {
      console.log('Response', res);
    })
  }
}
