import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {BooksListComponent} from './books-list/books-list.component';
import {GuardIfUserLoggedIn} from './guard-if-user-logged-in.service';
import {GuardIfUserNotLoggedIn} from './guard-if-user-not-logged-in.service';

export const routes: Routes = [
  {path: '', redirectTo: '/catalog', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [GuardIfUserNotLoggedIn]},
  {path: 'catalog', component: BooksListComponent, canActivate: [GuardIfUserLoggedIn]}
];
