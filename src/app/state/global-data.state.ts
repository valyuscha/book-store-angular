import {State, Selector} from '@ngxs/store';
import {Injectable} from '@angular/core';

export class GlobalDataStateModel {
  apiHost!: string;

}

@State<GlobalDataStateModel>({
  name: 'globalData',
  defaults: {
    apiHost: 'https://js-band-store-api.glitch.me'
  }
})
@Injectable()
export class GlobalDataState {
  @Selector()
  static getApiHost(state: GlobalDataStateModel) {
    return state.apiHost;
  }
}
