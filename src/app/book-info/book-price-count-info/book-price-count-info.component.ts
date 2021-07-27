import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewRef } from '@angular/core';
import {ICartBook, IDefaultBook} from 'interfaces';
import {Select, Store} from '@ngxs/store';
import { count } from 'rxjs/operators';
import {CartState} from 'state';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {Add} from 'actions';
import {ModalsService} from 'services';

@Component({
  selector: 'app-book-price-count-info',
  templateUrl: './book-price-count-info.component.html',
  styleUrls: ['./book-price-count-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookPriceCountInfoComponent implements OnInit {
  @Input() activeBook!: IDefaultBook;

  activeBookAddedCount = 1;
  activeBookInCart$!: Observable<ICartBook>;
  canInc: boolean = true;
  canDec: boolean = false;
  totalPrice: number = 0;

  constructor(private store: Store, private modals: ModalsService) {
  }

  getCartBook(): ICartBook {
    return this.store.selectSnapshot<ICartBook>(state => state.cart.books.find((item: ICartBook) => item.id === this.activeBook.id)) ||{
      addedCount: 0
    };
  }

  ngOnInit(): void {
    this.activeBookInCart$ = this.store.select<ICartBook>(state => state.cart.books.find((item: ICartBook) => item.id === this.activeBook.id));
    this.activeBookAddedCount = 1;
    this.totalPrice = this.activeBook.price;
    this.refreshRules();
  }

  increaseBooksCount(): void {
    if (!this.canInc) {
      return
    }
    this.activeBookAddedCount++;
    this.refreshRules();
  }

  private refreshRules() {
    const cart = this.getCartBook();
    if (cart.addedCount === cart.availableCount) {
      this.activeBookAddedCount = 0;
    }
    this.canInc = this.activeBook.count - (cart?.addedCount || 0) - this.activeBookAddedCount > 0;
    this.canDec = this.activeBookAddedCount > 1;
  }

  decreaseBooksCount(): void {
    if (!this.canDec) {
      return
    }
    this.activeBookAddedCount--;
    this.refreshRules();
  }

  addToCart(): void {
    if (this.activeBookAddedCount === 0) {
      return
    }

    this.store.dispatch(new Add({
      id: this.activeBook.id,
      addedCount: this.activeBookAddedCount,
      availableCount: this.activeBook.count,
      totalPrice: this.totalPrice,
      price: this.activeBook.price,
      title: this.activeBook.title
    }))

    this.modals.showAddedBookToCartModal();
    this.activeBookAddedCount = 1;
    this.refreshRules();
  }
}
