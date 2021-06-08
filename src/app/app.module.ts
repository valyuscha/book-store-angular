import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SpinnerInfinityModule} from 'spinners-angular/spinner-infinity';

import {routes} from 'app-routing';
import {AppComponent} from 'app.component';
import {HeaderComponent} from 'layouts';
import {LoginComponent, BooksListComponent} from 'pages';
import {GuardIfUserLoggedIn, GuardIfUserNotLoggedIn} from 'guards';
import {AuthService} from 'services';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    BooksListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    SpinnerInfinityModule,
    RouterModule.forRoot(routes)
  ],
  providers: [GuardIfUserLoggedIn, GuardIfUserNotLoggedIn, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
