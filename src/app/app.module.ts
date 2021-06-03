import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {routes} from './app-routing';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {BooksListComponent} from './books-list/books-list.component';
import {RouterModule} from '@angular/router';
import {GuardIfUserLoggedIn} from './guard-if-user-logged-in.service';
import {AuthService} from './auth.service';
import {GuardIfUserNotLoggedIn} from './guard-if-user-not-logged-in.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    BooksListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [GuardIfUserLoggedIn, GuardIfUserNotLoggedIn, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
