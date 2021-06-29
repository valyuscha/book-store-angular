import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, CartService, LoaderService} from 'services';
import {Subscription} from 'rxjs';
import {ICartBook} from '../interfaces';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  books: ICartBook[] = [];

  constructor(public loader: LoaderService, public cart: CartService, private router: ActivatedRoute, private auth: AuthService) {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
