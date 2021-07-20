import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from 'services';
import {Observable, Subscription} from 'rxjs';
import {ICartBook} from 'interfaces';
import {Select} from '@ngxs/store';
import {LoaderState} from '../state/loader.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit, OnDestroy {
  @Select(LoaderState.getIsLoadingStatus) isLoading!: Observable<boolean>;
  private subscription = new Subscription();
  books: ICartBook[] = [];

  constructor(public cart: CartService) {
  }

  ngOnInit() {
    this.subscription = this.cart.books$.subscribe(books => {
      this.books = Object.entries(books).map(book => {
        const bookInfo = {...book[1]};
        bookInfo.id = book[0];
        return bookInfo;
      })
    })
  }

  trackByFn(index: string | number) {
    return index;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
