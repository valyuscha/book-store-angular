import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
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
export class CartComponent {
  @Select(LoaderState.getIsLoadingStatus) isLoading!: Observable<boolean>;
  @Select(CartState.getBooks) books$!: Observable<ICartBook[]>;
  @Select(CartState.getTotalCount) totalCount!: Observable<number>;
  @Select(CartState.getTotalPrice) totalPrice!: Observable<number>;

  constructor(private store: Store) {
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
}
