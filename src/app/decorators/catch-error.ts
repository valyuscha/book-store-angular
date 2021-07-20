import {catchError} from 'rxjs/operators';
import {DecoratorStoreService} from 'services';
import {Observable} from 'rxjs';
import {Logout, ShowServerErrorMessage} from 'actions';

export function CatchError(target: any, propName: string | Symbol, descriptor: PropertyDescriptor) {
  const oldMethod = descriptor.value;
  descriptor.value = function (...args:any[]) {
    const result = oldMethod.apply(this, args) as Observable<any>;
    return result.pipe(
      catchError(err => {
        if (err.status === 401) {
          DecoratorStoreService.instance.dispatch(new Logout());
        } else {
          DecoratorStoreService.instance.dispatch(new ShowServerErrorMessage());
        }

        return err;
      }));
  }
  return descriptor;
}
