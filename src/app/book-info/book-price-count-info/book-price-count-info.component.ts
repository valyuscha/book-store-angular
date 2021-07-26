import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ICartBook, IDefaultBook} from 'interfaces';
import {Select, Store} from '@ngxs/store';
import {CartState} from 'state';
import {BehaviorSubject, Observable} from 'rxjs';
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
  @Select(CartState.getBooks) cartBooks$!: Observable<ICartBook[]>;

  activeBookAddedCount$ = new BehaviorSubject<number>(0);
  activeBookInCart: ICartBook | null = null;
  canInc: boolean = true;
  canDec: boolean = false;
  totalPrice: number = 0;

  constructor(private store: Store, private modals: ModalsService) { }

  ngOnInit(): void {
    this.totalPrice = this.activeBook.price;

    this.cartBooks$.subscribe(books => books.filter(item => {
      if (item.id === this.activeBook.id) {
        this.activeBookInCart = item;
      }
    }));

    this.activeBookAddedCount$.subscribe(count => {
      if (!this.activeBookInCart) {
        this.canInc = count < this.activeBook.count;
      } else {
        this.canInc = count < this.activeBookInCart.availableCount - this.activeBookInCart.addedCount;
      }

      this.canDec = count > 1;
      this.totalPrice = Math.round((this.activeBook.price * count) * 100) / 100;
    })

    if (this.canInc) {
      this.activeBookAddedCount$.next(1);
    }
  }

  increaseBooksCount(): void {
    const prev = this.activeBookAddedCount$.getValue();
    if (this.canInc) {
      this.activeBookAddedCount$.next(prev + 1);
    }
  }

  decreaseBooksCount(): void {
    const prev = this.activeBookAddedCount$.getValue();
    if (this.canDec) {
      this.activeBookAddedCount$.next(prev - 1);
    }
  }

  addToCart(): void {
    if (this.activeBookAddedCount$.getValue() !== 0) {
      this.store.dispatch(new Add({
        id: this.activeBook.id,
        addedCount: this.activeBookAddedCount$.getValue(),
        availableCount: this.activeBook.count,
        totalPrice: this.totalPrice,
        price: this.activeBook.price,
        title: this.activeBook.title
      }))

      this.modals.showAddedBookToCartModal();
    }

    if (this.canInc) {
      this.activeBookAddedCount$.next(1);
    } else {
      this.activeBookAddedCount$.next(0);
    }
  }
}
