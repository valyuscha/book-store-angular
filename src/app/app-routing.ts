import {Routes} from '@angular/router';
import {GuardIfUserNotLoggedIn, GuardIfUserLoggedIn} from 'guards';
import {LoginComponent} from 'login/login.component';
import {BooksListComponent} from 'books-list/books-list.component';
import {BookInfoComponent} from 'book-info/book-info.component';

export const routes: Routes = [
  {path: '', redirectTo: '/catalog', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [GuardIfUserNotLoggedIn]},
  {path: 'catalog', component: BooksListComponent, canActivate: [GuardIfUserLoggedIn]},
  {path: 'catalog/:id', component: BookInfoComponent, canActivate: [GuardIfUserLoggedIn]}
];
