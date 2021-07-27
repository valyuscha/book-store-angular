import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Add, Clear, Edit, Purchase, Remove } from 'actions';
import { ICartBook } from 'interfaces';
import { tap } from 'rxjs/operators';
import { ApiService, LocalStorageService } from 'services';
import { Injectable } from '@angular/core';

export class CartStateModel {
  books!: ICartBook[];
  purchaseMessage!: string;
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    books: [],
    purchaseMessage: ''
  }
})
@Injectable()
export class CartState implements NgxsOnInit {
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

  ngxsOnInit(ctx: StateContext<CartStateModel>) {
    ctx.patchState({
      books: this.localStorage.getObject<ICartBook[]>('cart') as ICartBook[] || []
    });
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
    const currentBookInCart = books.find((item: ICartBook) => item.id === payload.bookId);
    if (currentBookInCart) {
      currentBookInCart.addedCount = payload.number;
      patchState({books});
      this.localStorage.set('cart', books);
    }
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
  purchase({getState, patchState}: StateContext<CartStateModel>) {
    const books = getState().books
    return this.api.purchase(books)
      .pipe(tap((res) => {
        console.log(res);
        patchState({purchaseMessage: res.message});
      }));
  }
}
