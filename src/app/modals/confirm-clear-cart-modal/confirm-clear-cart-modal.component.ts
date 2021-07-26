import {Component} from '@angular/core';
import {Store} from '@ngxs/store';
import {ModalsService} from 'services';
import {Clear} from 'actions';

@Component({
  selector: 'app-confirm-clear-cart-modal',
  templateUrl: './confirm-clear-cart-modal.component.html',
  styleUrls: ['./confirm-clear-cart-modal.component.scss']
})
export class ConfirmClearCartModalComponent {
  constructor(private store: Store, public modals: ModalsService) {
  }

  clearCart() {
    this.store.dispatch(new Clear());
    this.modals.hideConfirmClearCartModal();
  }
}
