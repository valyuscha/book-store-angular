import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService, AuthService, LoaderService} from 'services';
import {IDefaultBook} from '../interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  activeBook: IDefaultBook = {
    id: '',
    count: 0,
    price: 0,
    title: '',
    author: '',
    level: '',
    description: '',
    cover: '',
    tags: ['']
  };

  constructor(public router: ActivatedRoute, public api: ApiService, public loader: LoaderService, private auth: AuthService) {
  }

  ngOnInit() {
    this.subscription = this.router.data.subscribe(book => {
      this.activeBook = book.book;
    }, () => {
      this.auth.logout();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
