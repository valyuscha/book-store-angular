import {Component, Input, OnInit} from '@angular/core';
import {ICartBook} from 'interfaces';
import {CartService} from 'services';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() book: ICartBook = {
    id: '0',
    addedCount: 0,
    availableCount: 0,
    canUserDecreaseBooksCount: false,
    canUserIncreaseBooksCount: false,
    currentBookTotalPrice: 0,
    price: 0,
    title: 'Title'
  };
  @Input() allBooks: ICartBook[] = [];

  constructor(public cart: CartService) {
  }

  ngOnInit(): void {
  }

}
