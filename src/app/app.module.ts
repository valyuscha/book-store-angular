import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SpinnerInfinityModule} from 'spinners-angular/spinner-infinity';

import {routes} from 'app-routing';
import {AppComponent} from 'app.component';
import {HeaderComponent} from 'header/header.component';
import {LoginComponent} from 'login/login.component';
import {BooksListComponent} from 'books-list/books-list.component';
import {BookInfoComponent} from 'book-info/book-info.component';
import {GuardIfUserLoggedIn, GuardIfUserNotLoggedIn} from 'guards';
import {AuthService} from 'services';
import {ConfirmLogoutModalComponent} from 'modals';
import {BookCardComponent} from 'books-list/book-card/book-card.component';
import {BookPriceCountInfoComponent} from 'book-info/book-price-count-info/book-price-count-info.component';
import {BooksCatalogFiltersComponent} from './books-list/books-catalog-filters/books-catalog-filters.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    BooksListComponent,
    ConfirmLogoutModalComponent,
    BookCardComponent,
    BooksCatalogFiltersComponent,
    BookInfoComponent,
    BookPriceCountInfoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SpinnerInfinityModule,
    RouterModule.forRoot(routes)
  ],
  providers: [GuardIfUserLoggedIn, GuardIfUserNotLoggedIn, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
