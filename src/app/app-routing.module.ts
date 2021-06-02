import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {LoginComponent} from './login/login.component'
import {BooksListComponent} from './books-list/books-list.component'
import {CanActivateLogin, Permissions} from './can-activate.service'

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'catalog', component: BooksListComponent, canActivate: [CanActivateLogin]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateLogin, Permissions]
})
export class AppRoutingModule {
}
