import {Component} from '@angular/core';
import {ModalsService} from 'services';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.scss']
})
export class PurchaseModalComponent {
  constructor(public modals: ModalsService) { }
}
