import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SpinnerInfinityModule} from 'spinners-angular/spinner-infinity';

import {routes} from 'app-routing';
import {AppComponent} from 'app.component';
import {HeaderComponent} from 'layouts';
import {LoginComponent, BooksListComponent} from 'pages';
import {GuardIfUserLoggedIn, GuardIfUserNotLoggedIn} from 'guards';
import {AuthService} from 'services';
import { ConfirmLogoutModalComponent } from './modals/confirm-logout-modal/confirm-logout-modal.component';
import { BookCardComponent } from 'components';
import { BooksCatalogFiltersComponent } from './components/books-catalog-filters/books-catalog-filters.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    BooksListComponent,
    ConfirmLogoutModalComponent,
    BookCardComponent,
    BooksCatalogFiltersComponent
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
