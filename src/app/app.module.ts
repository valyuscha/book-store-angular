import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SpinnerInfinityModule} from 'spinners-angular/spinner-infinity';
import {AngularSvgIconModule} from 'angular-svg-icon';

import {routes} from 'app-routing';
import {AppComponent} from 'app.component';
import {HeaderComponent} from 'header/header.component';
import {LoginComponent} from 'login/login.component';
import {BooksListComponent} from 'books-list/books-list.component';
import {BookInfoComponent} from 'book-info/book-info.component';
import {GuardIfUserLoggedIn, GuardIfUserNotLoggedIn} from 'guards';
import {ConfirmLogoutModalComponent, AddedBookToCartModalComponent} from 'modals';
import {BookCardComponent} from 'books-list/book-card/book-card.component';
import {BooksCatalogFiltersComponent} from './books-list/books-catalog-filters/books-catalog-filters.component';
import { LoaderComponent } from './loader/loader.component';
import { HttpErrorMessageComponent } from './http-error-message/http-error-message.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';

import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {DecoratorStoreService} from 'services';
import {AuthState, LoaderState, ServerErrorMessageState, GlobalDataState, CartState} from 'state';
import { BookPriceCountInfoComponent } from './book-info/book-price-count-info/book-price-count-info.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmClearCartModalComponent } from './modals/confirm-clear-cart-modal/confirm-clear-cart-modal.component';
import { PurchaseModalComponent } from './modals/purchase-modal/purchase-modal.component';

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
    LoaderComponent,
    AddedBookToCartModalComponent,
    HttpErrorMessageComponent,
    BookPriceCountInfoComponent,
    CartComponent,
    ConfirmClearCartModalComponent,
    PurchaseModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SpinnerInfinityModule,
    RouterModule.forRoot(routes),
    AngularSvgIconModule.forRoot(),
    NgxsModule.forRoot([LoaderState, ServerErrorMessageState, AuthState, GlobalDataState, CartState]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    GuardIfUserLoggedIn,
    GuardIfUserNotLoggedIn,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(store: DecoratorStoreService) {
  }
}
