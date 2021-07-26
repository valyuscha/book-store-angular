import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Add, Clear, Edit, Purchase, Remove} from 'actions';
import {ICartBook} from 'interfaces';
import {ApiService, LocalStorageService} from 'services';
import {Injectable} from '@angular/core';

export class CartStateModel {
  books!: ICartBook[];
  purchaseMessage!: string;
}

const books = localStorage.getItem('cart');

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    books: books ? JSON.parse(books) : [],
    purchaseMessage: ''
  }
})
@Injectable()
export class CartState {
  constructor(private localStorage: LocalStorageService, private api: ApiService) {
  }

  @Selector()
  static getBooks(state: CartStateModel): ICartBook[] {
    return state.books;
  }

  @Selector()
  static getTotalPrice(state: CartStateModel): number {
    return state.books.reduce((acc, item) => {
      return Math.round((item.addedCount * item.price + acc) * 100) / 100;
    }, 0);
  }

  @Selector()
  static getTotalCount(state: CartStateModel): number {
    return state.books.reduce((acc, item) => {
      return Math.round((item.addedCount + acc) * 100) / 100;
    }, 0);
  }

  @Action(Add)
  add({getState, patchState}: StateContext<CartStateModel>, {payload}: Add) {
    const books = [...getState().books];
    const currentBookInCart = books.filter((item: ICartBook) => item.id === payload.id);
    if (currentBookInCart.length) {
      currentBookInCart[0].addedCount += payload.addedCount;
    } else {
      books.push({
        id: payload.id,
        addedCount: payload.addedCount,
        availableCount: payload.availableCount,
        totalPrice: payload.totalPrice,
        price: payload.price,
        title: payload.title
      });
    }

    patchState({books});
    this.localStorage.set('cart', books);
  }

  @Action(Edit)
  edit({getState, patchState}: StateContext<CartStateModel>, {payload}: Edit) {
    const books = [...getState().books];
    const currentBookInCart = books.filter((item: ICartBook) => item.id === payload.bookId);

    switch (payload.action) {
      case 'add':
        currentBookInCart[0].addedCount++;
        break;
      case 'remove':
        currentBookInCart[0].addedCount--;
        break;
      default:
        currentBookInCart[0].addedCount;
    }

    patchState({books});
    this.localStorage.set('cart', books);
  }

  @Action(Remove)
  remove({getState, patchState}: StateContext<CartStateModel>, {payload}: Remove) {
    const books = [...getState().books];
    const filteredBooks = books.filter(item => item.id !== payload);
    patchState({books: filteredBooks});
    this.localStorage.set('cart', filteredBooks);
  }

  @Action(Clear)
  clear({patchState}: StateContext<CartStateModel>) {
    patchState({books: []});
    this.localStorage.set('cart', []);
  }

  @Action(Purchase)
  purchase({patchState}: StateContext<CartStateModel>, {payload}: Purchase) {
    this.api.purchase(payload)
      .subscribe(res => {
        console.log(res);
        patchState({purchaseMessage: res.message});
      });
  }
}
