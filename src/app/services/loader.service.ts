import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  static instance: LoaderService;

  constructor() {
    LoaderService.instance = this;
  }

  get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  startLoading() {
    this._isLoading$.next(true);
  }

  stopLoading() {
    this._isLoading$.next(false);
  }
}
