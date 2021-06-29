import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerErrorMessageService {
  private _isServerErrorMessageVisible$ = new BehaviorSubject(false);
  static instance: ServerErrorMessageService;

  constructor() {
    ServerErrorMessageService.instance = this;
  }

  get isServerErrorMessageVisible$(): Observable<boolean> {
    return this._isServerErrorMessageVisible$.asObservable();
  }

  showServerErrorMessage() {
    this._isServerErrorMessageVisible$.next(true);
  }

  hideServerErrorMessage() {
    this._isServerErrorMessageVisible$.next(false);
  }
}
