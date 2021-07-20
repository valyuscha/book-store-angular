import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class DecoratorStoreService {
  static instance: Store;

  constructor(store: Store) {
    DecoratorStoreService.instance = store;
  }
}
