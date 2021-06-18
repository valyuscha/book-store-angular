import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from 'services';

@Injectable({
  providedIn: 'root'
})
export class BookInfoResolver implements Resolve<boolean> {
  constructor(private api: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    return this.api.getCurrentBookInfo(Number(route.paramMap.get('id')));
  }
}
