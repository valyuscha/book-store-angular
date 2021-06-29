import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  private _isConfirmLogoutModalVisible$ = new BehaviorSubject(false);
  private _isAddedBookToCartModalVisible$ = new BehaviorSubject(false);

  get isConfirmLogoutModalVisible$(): Observable<boolean> {
    return this._isConfirmLogoutModalVisible$.asObservable();
  }

  get isAddedBookToCartModalVisible$(): Observable<boolean> {
    return this._isAddedBookToCartModalVisible$.asObservable();
  }

  showConfirmLogoutModal() {
    this._isConfirmLogoutModalVisible$.next(true);
  }

  hideConfirmLogoutModal() {
    this._isConfirmLogoutModalVisible$.next(false);
  }

  showAddedBookToCartModal() {
    this._isAddedBookToCartModalVisible$.next(true);
  }

  hideAddedBookToCartModal() {
    this._isAddedBookToCartModalVisible$.next(false);
  }
}
