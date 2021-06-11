import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  isConfirmLogoutModalVisible$ = new BehaviorSubject(false);

  showConfirmLogoutModal() {
    this.isConfirmLogoutModalVisible$.next(true);
  }

  hideConfirmLogoutModal() {
    this.isConfirmLogoutModalVisible$.next(false);
  }
}
