import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {BooksService} from 'services';

@Injectable({
  providedIn: 'root'
})
export class GuardGetAllBooksGuard implements CanActivate {
  constructor(private books: BooksService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.books.loadBooks();
    return true;
  }
}
