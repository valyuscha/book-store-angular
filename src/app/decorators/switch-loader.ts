import {LoaderService} from 'services';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export function SwitchLoader(target: any, propName: string | Symbol, descriptor: PropertyDescriptor) {
  const oldMethod = descriptor.value;
  descriptor.value = function (...args:any[]) {
    LoaderService.instance.startLoading();
    const result = oldMethod.apply(this, args) as Observable<any>;
    return result.pipe(tap(() => LoaderService.instance.stopLoading()));
  }
  return descriptor;
}
