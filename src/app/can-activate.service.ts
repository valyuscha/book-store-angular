import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router} from '@angular/router'
import {Observable} from 'rxjs'

export class Permissions {
  canActivate(): boolean {
    return !!localStorage.getItem('token')
  }
}

@Injectable({
  providedIn: 'root'
})
export class CanActivateLogin implements CanActivate{
  constructor(private permissions: Permissions, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.permissions.canActivate()) {
      this.router.navigateByUrl('/login')
    }

    return this.permissions.canActivate()
  }
}
