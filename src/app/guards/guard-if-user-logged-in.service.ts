import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Select} from '@ngxs/store';
import {AuthState} from 'state';

@Injectable({
  providedIn: 'root'
})
export class GuardIfUserLoggedIn implements CanActivate {
  @Select(AuthState.getIsLoggedIn) isLoggedIn!: Observable<boolean>;

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn.pipe(map(isLoggedIn => isLoggedIn ? true : this.router.parseUrl('/login')));
  }
}
