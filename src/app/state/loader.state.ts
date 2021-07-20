import {State, Action, StateContext, Selector} from '@ngxs/store';
import {ShowLoader, HideLoader} from 'actions';
import {Injectable} from '@angular/core';

export class LoaderStateModel {
  isLoading: boolean = false;
}

@State<LoaderStateModel>({
  name: 'loader',
  defaults: {
    isLoading: false
  }
})
@Injectable()
export class LoaderState {
  @Selector()
  static getIsLoadingStatus(state: LoaderStateModel) {
    return state.isLoading;
  }

  @Action(ShowLoader)
  show({getState, patchState}: StateContext<LoaderStateModel>) {
    patchState({isLoading: true})
  }

  @Action(HideLoader)
  hide({getState, patchState}: StateContext<LoaderStateModel>) {
    patchState({isLoading: false})
  }
}
