import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  static instance: LocalStorageService;

  constructor() {
    LocalStorageService.instance = this;
  }

  getObject<T>(key: string): T | null {
    const dataText = localStorage.getItem(key);
    return dataText ? JSON.parse(dataText) : null;
  }

  set(key: string, value: any) {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
