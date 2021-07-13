import {catchError} from 'rxjs/operators';
import {AuthService, ServerErrorMessageService} from 'services';
import {Observable} from 'rxjs';

export function CatchError(target: any, propName: string | Symbol, descriptor: PropertyDescriptor) {
  const oldMethod = descriptor.value;
  descriptor.value = function (...args:any[]) {
    const result = oldMethod.apply(this, args) as Observable<any>;
    return result.pipe(
      catchError(err => {
        console.log(err.status);
        if (err.status === 401) {
          AuthService.instance.logout();
        } else {
          ServerErrorMessageService.instance.showServerErrorMessage();
        }

        return err;
      }));
  }
  return descriptor;
}
