import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {BooksListComponent} from './pages/books-list/books-list.component';
import {GuardIfUserNotLoggedIn, GuardIfUserLoggedIn} from 'guards';

export const routes: Routes = [
  {path: '', redirectTo: '/catalog', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [GuardIfUserNotLoggedIn]},
  {path: 'catalog', component: BooksListComponent, canActivate: [GuardIfUserLoggedIn]}
];
