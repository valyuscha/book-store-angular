import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {AuthService} from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  isValid = false
  isTouched = false

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.logout()
  }

  ngOnDestroy() {
    this.auth.login()
  }

  goToCatalogPage() {
    this.router.navigateByUrl('/catalog')
  }
}
