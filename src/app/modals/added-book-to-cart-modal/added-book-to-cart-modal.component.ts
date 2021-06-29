import {Component} from '@angular/core';
import {ModalsService} from 'services';

@Component({
  selector: 'app-added-book-to-cart-modal',
  templateUrl: './added-book-to-cart-modal.component.html',
  styleUrls: ['./added-book-to-cart-modal.component.scss']
})
export class AddedBookToCartModalComponent {
  constructor(public modalsService: ModalsService) {
  }
}
