import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {HeaderComponent} from './header/header.component'
import {LoginComponent} from './login/login.component'
import {BooksListComponent} from './books-list/books-list.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    BooksListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
