import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {SpinnerInfinityModule} from 'spinners-angular/spinner-infinity';
import {AngularSvgIconModule} from 'angular-svg-icon';

import {routes} from 'app-routing';
import {AppComponent} from 'app.component';
import {HeaderComponent} from 'header/header.component';
import {LoginComponent} from 'login/login.component';
import {BooksListComponent} from 'books-list/books-list.component';
import {BookInfoComponent} from 'book-info/book-info.component';
import {GuardIfUserLoggedIn, GuardIfUserNotLoggedIn} from 'guards';
import {AuthService} from 'services';
import {ConfirmLogoutModalComponent, AddedBookToCartModalComponent} from 'modals';
import {BookCardComponent} from 'books-list/book-card/book-card.component';
import {BookPriceCountInfoComponent} from 'book-info/book-price-count-info/book-price-count-info.component';
import {BooksCatalogFiltersComponent} from './books-list/books-catalog-filters/books-catalog-filters.component';
import { LoaderComponent } from './loader/loader.component';
import { CartComponent } from './cart/cart.component';
import { HttpErrorMessageComponent } from './http-error-message/http-error-message.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';

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
    BookPriceCountInfoComponent,
    LoaderComponent,
    AddedBookToCartModalComponent,
    CartComponent,
    HttpErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SpinnerInfinityModule,
    RouterModule.forRoot(routes),
    AngularSvgIconModule.forRoot(),
    NgxsModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    GuardIfUserLoggedIn,
    GuardIfUserNotLoggedIn,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
