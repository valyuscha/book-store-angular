import {State, Action, StateContext, Selector} from '@ngxs/store';
import {ShowServerErrorMessage, HideServerErrorMessage} from 'actions';
import {Injectable} from '@angular/core';

export class ServerErrorMessageStateModel {
  isVisible!: boolean;
}

@State<ServerErrorMessageStateModel>({
  name: 'serverErrorMessage',
  defaults: {
    isVisible: false
  }
})
@Injectable()
export class ServerErrorMessageState {
  @Selector()
  static getIsVisible(state: ServerErrorMessageStateModel) {
    return state.isVisible;
  }

  @Action(ShowServerErrorMessage)
  show({patchState}: StateContext<ServerErrorMessageStateModel>) {
    patchState({isVisible: true})
  }

  @Action(HideServerErrorMessage)
  hide({patchState}: StateContext<ServerErrorMessageStateModel>) {
    patchState({isVisible: false})
  }
}
