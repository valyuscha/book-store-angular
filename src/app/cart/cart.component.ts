import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ICartBook} from 'interfaces';
import {Select, Store} from '@ngxs/store';
import {CartState, LoaderState} from 'state';
import {AddRemoveBookFromCartAction, BookInfo} from 'globalTypes';
import {Clear, Edit, Purchase, Remove} from 'actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit, OnDestroy {
  @Select(LoaderState.getIsLoadingStatus) isLoading!: Observable<boolean>;
  @Select(CartState.getBooks) books$!: Observable<BookInfo>;
  @Select(CartState.getTotalCount) totalCount!: Observable<number>;
  @Select(CartState.getTotalPrice) totalPrice!: Observable<number>;
  private subscription = new Subscription();
  books: ICartBook[] = [];

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.subscription = this.books$.subscribe(books => {
      this.books = books ? Object.entries(books).map(book => {
        const bookInfo = {...book[1]};
        bookInfo.id = book[0];
        return bookInfo;
      }) : [];
    })
  }

  trackByFn(index: string | number) {
    return index;
  }

  edit(bookId: string, action: AddRemoveBookFromCartAction) {
    this.store.dispatch(new Edit({bookId, action}));
  }

  remove(bookId: string) {
    this.store.dispatch(new Remove(bookId));
  }

  clear() {
    this.store.dispatch(new Clear());
  }

  purchase() {
    this.store.dispatch(new Purchase());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
