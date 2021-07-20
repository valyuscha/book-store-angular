import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HideLoader, ShowLoader} from '../actions/loader.actions';
import {DecoratorStoreService} from '../services/decorator-store.service';

export function ProgressIndicator(target: any, propName: string | Symbol, descriptor: PropertyDescriptor) {
  const oldMethod = descriptor.value;
  descriptor.value = function (...args:any[]) {
    DecoratorStoreService.instance.dispatch(new ShowLoader())
    const result = oldMethod.apply(this, args) as Observable<any>;
    return result.pipe(
      tap(() => DecoratorStoreService.instance.dispatch(new HideLoader())),
      catchError(err => {
        DecoratorStoreService.instance.dispatch(new HideLoader())
        return err;
      })
    );
  }
  return descriptor;
}
