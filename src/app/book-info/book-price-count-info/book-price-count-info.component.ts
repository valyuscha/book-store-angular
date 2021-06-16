import {Component, Input, OnInit} from '@angular/core';
import {ICartBook, IDefaultBook} from 'interfaces';
import {AddRemoveBookFromCartAction} from 'globalTypes';
import {disableAddingNewBooksIfThereISNoCurrentBooks} from './disableAddingNewBooks';
import {CartService} from 'services';
import {getChangedBooksCount} from './getChangedBooksCount';
import {countTotalPriceOfSameBooks} from 'utils';

@Component({
  selector: 'app-book-price-count-info',
  templateUrl: './book-price-count-info.component.html',
  styleUrls: ['./book-price-count-info.component.scss']
})
export class BookPriceCountInfoComponent implements OnInit {
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

  constructor(private cart: CartService) {
    this.cart.books$.subscribe(books => this.addedBooks = books);
  }

  ngOnInit() {
    this.totalPrice = this.activeBook.price;

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
    const currentBookInCart: [string, ICartBook][] = Object.entries<ICartBook>(this.addedBooks)
      .filter((book) => {
        if (+book[0] === +this.activeBook.id) return book;
        return
      })

    const changedBooksCount = getChangedBooksCount(
      currentBookInCart,
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
      this.cart.add(this.activeBook, this.booksCount, this.totalPrice);
      this.booksCount = 1;

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
}
