import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  private _isConfirmLogoutModalVisible$ = new BehaviorSubject(false);
  private _isAddedBookToCartModalVisible$ = new BehaviorSubject(false);
  private _isConfirmClearCartModalVisible$ = new BehaviorSubject(false);
  private _isPurchaseModalVisible$ = new BehaviorSubject(false);

  get isConfirmLogoutModalVisible$(): Observable<boolean> {
    return this._isConfirmLogoutModalVisible$.asObservable();
  }

  get isAddedBookToCartModalVisible$(): Observable<boolean> {
    return this._isAddedBookToCartModalVisible$.asObservable();
  }

  get isConfirmClearCartModalVisible$(): Observable<boolean> {
    return this._isConfirmClearCartModalVisible$.asObservable();
  }

  get isPurchaseModalVisible$(): Observable<boolean> {
    return this._isPurchaseModalVisible$.asObservable();
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

  showConfirmClearCartModal() {
    this._isConfirmClearCartModalVisible$.next(true);
  }

  hideConfirmClearCartModal() {
    this._isConfirmClearCartModalVisible$.next(false);
  }

  showPurchaseModal() {
    this._isPurchaseModalVisible$.next(true);
  }

  hidePurchaseModal() {
    this._isPurchaseModalVisible$.next(false);
  }
}
