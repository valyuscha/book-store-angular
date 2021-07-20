import {State, Selector} from '@ngxs/store';

export class GlobalDataStateModel {
  apiHost!: string;
}

@State<GlobalDataStateModel>({
  name: 'globalData',
  defaults: {
    apiHost: 'https://js-band-store-api.glitch.me'
  }
})
export class GlobalDataState {
  @Selector()
  static getApiHost(state: GlobalDataStateModel) {
    return state.apiHost;
  }
}
