import {Routes} from '@angular/router';
import {GuardIfUserNotLoggedIn, GuardIfUserLoggedIn} from 'guards';
import {LoginComponent} from 'login/login.component';
import {BooksListComponent} from 'books-list/books-list.component';
import {BookInfoComponent} from 'book-info/book-info.component';
import {BookInfoResolver} from './resolvers/book-info.resolver';
import {CartComponent} from './cart/cart.component';
import {GuardGetAllBooksGuard} from './guards/guard-get-all-books.guard';

export const routes: Routes = [
  {path: '', redirectTo: '/catalog', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [GuardIfUserNotLoggedIn]},
  {path: 'catalog', component: BooksListComponent, canActivate: [GuardIfUserLoggedIn, GuardGetAllBooksGuard]},
  {path: 'catalog/:id', component: BookInfoComponent, canActivate: [GuardIfUserLoggedIn], resolve: {book: BookInfoResolver}},
  {path: 'cart', component: CartComponent, canActivate: [GuardIfUserLoggedIn]}
];
