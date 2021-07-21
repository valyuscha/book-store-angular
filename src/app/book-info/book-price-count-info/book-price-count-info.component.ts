import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IDefaultBook} from 'interfaces';
import {AddRemoveBookFromCartAction, BookInfo} from 'globalTypes';
import {disableAddingNewBooksIfThereISNoCurrentBooks} from './disableAddingNewBooks';
import {ModalsService} from 'services';
import {getChangedBooksCount} from './getChangedBooksCount';
import {countTotalPriceOfSameBooks} from 'utils';
import {Observable, Subscription} from 'rxjs';
import {getCurrentBook} from './getCurrentBook';
import {Select, Store} from '@ngxs/store';
import {CartState} from 'state';
import {Add} from '../../actions';

@Component({
  selector: 'app-book-price-count-info',
  templateUrl: './book-price-count-info.component.html',
  styleUrls: ['./book-price-count-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookPriceCountInfoComponent implements OnInit, OnDestroy {
  @Select(CartState.getBooks) books!: Observable<BookInfo>;
  private subscription = new Subscription();

  @Input() activeBook: IDefaultBook = {
    id: '',
    count: 0,
    price: 0,
    title: '',
    author: '',
    level: '',
    description: '',
    cover: '',
    tags: ['']
  };

  addedBooks = {};
  totalPrice = 0;
  booksCount = 1;
  canIncreaseBooksAmount = true;
  canDecreaseBooksAmount = false;
  currentBookAddedCount = 0;

  constructor(private modals: ModalsService, private store: Store) {
  }

  ngOnInit() {
    this.subscription = this.books.subscribe(books => this.addedBooks = books);
    this.totalPrice = this.activeBook.price;
    const currentBookInCart = getCurrentBook(this.addedBooks, this.activeBook)[0];
    this.currentBookAddedCount = currentBookInCart ? currentBookInCart[1].addedCount : 0;

    disableAddingNewBooksIfThereISNoCurrentBooks(
      this.addedBooks,
      this.activeBook,
      this.setBooksCount.bind(this),
      this.setCanIncreaseBooksCount.bind(this),
      this.setTotalPrice.bind(this)
    )
  }

  setBooksCount(count: number) {
    this.booksCount = count;
  }

  setCanIncreaseBooksCount(canIncrease: boolean) {
    this.canIncreaseBooksAmount = canIncrease;
  }

  setTotalPrice(price: number) {
    this.totalPrice = price;
  }

  changeBooksAmount(action: AddRemoveBookFromCartAction) {
    const changedBooksCount = getChangedBooksCount(
      getCurrentBook(this.addedBooks, this.activeBook),
      this.booksCount,
      this.activeBook,
      this.setCanIncreaseBooksCount.bind(this),
      action
    );

    if (changedBooksCount) {
      this.totalPrice = countTotalPriceOfSameBooks(this.activeBook.price, changedBooksCount);
    }

    if (changedBooksCount > 1) {
      this.canDecreaseBooksAmount = true;
    } else if (changedBooksCount === 1) {
      this.canDecreaseBooksAmount = false;
    }

    this.booksCount = changedBooksCount;
  }

  addNewBookToCart() {
    if (this.booksCount) {
      this.modals.showAddedBookToCartModal();
      this.store.dispatch(new Add((
        {book: this.activeBook, addedCount: this.booksCount, currentBookTotalPrice: this.totalPrice}
      )));
      this.booksCount = 1;
      const currentBookInCart = getCurrentBook(this.addedBooks, this.activeBook)[0];
      this.currentBookAddedCount = currentBookInCart ? currentBookInCart[1].addedCount : 0;

      disableAddingNewBooksIfThereISNoCurrentBooks(
        this.addedBooks,
        this.activeBook,
        this.setBooksCount.bind(this),
        this.setCanIncreaseBooksCount.bind(this),
        this.setTotalPrice.bind(this)
      )

      this.canDecreaseBooksAmount = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
