import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  private _apiHost = 'https://js-band-store-api.glitch.me'

  get apiHost(): string {
    return this._apiHost;
  }
}
