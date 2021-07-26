import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {ICartBook} from 'interfaces';
import {CartState} from 'state';
import {AddRemoveBookFromCartAction} from 'globalTypes';
import {Edit, Purchase, Remove} from 'actions';
import {ApiService, ModalsService} from 'services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  @Select(CartState.getBooks) books$!: Observable<ICartBook[]>;
  @Select(CartState.getTotalCount) totalCount$!: Observable<number>;
  @Select(CartState.getTotalPrice) totalPrice$!: Observable<number>;
  private subscription = new Subscription();
  books: ICartBook[] = [];

  constructor(private store: Store, public modals: ModalsService, private api: ApiService) {
  }

  ngOnInit() {
    this.subscription = this.books$.subscribe(books => this.books = books);
  }

  editBooksCount(bookId: string, action: AddRemoveBookFromCartAction): void {
    this.store.dispatch(new Edit({bookId, action}));
  }

  deleteBook(bookId: string): void {
    this.store.dispatch(new Remove(bookId));
  }

  purchase() {
    this.store.dispatch(new Purchase(this.books));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
