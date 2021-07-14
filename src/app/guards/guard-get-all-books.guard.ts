import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {BooksService} from 'services';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardGetAllBooksGuard implements CanActivate {
  constructor(private books: BooksService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.books.loadBooks().pipe(map(() => true));
  }
}
