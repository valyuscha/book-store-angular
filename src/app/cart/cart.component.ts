import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {ICartBook} from 'interfaces';
import {CartState} from 'state';
import {Edit, Purchase, Remove} from 'actions';
import {ModalsService} from 'services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  @Select(CartState.getBooks) books$!: Observable<ICartBook[]>;
  @Select(CartState.getTotalCount) totalCount$!: Observable<number>;
  @Select(CartState.getTotalPrice) totalPrice$!: Observable<number>;

  constructor(private store: Store, public modals: ModalsService) {
  }

  setBooksNumber(book: ICartBook, step: number) {
    if (book.addedCount + step < 0 || book.addedCount + step > book.availableCount) return;
    if (book.addedCount + step === 0) {
      this.deleteBook(book.id);
      return;
    }
    this.store.dispatch(new Edit({bookId: book.id, number: book.addedCount + step}));
  }

  deleteBook(bookId: string): void {
    this.store.dispatch(new Remove(bookId));
  }

  purchase() {
    this.store.dispatch(new Purchase());
  }
}
