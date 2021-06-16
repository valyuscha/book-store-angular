import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IDefaultBook} from 'interfaces';
import {ApiService, AuthService} from 'services';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {
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
  isLoading = false;

  constructor(private router: ActivatedRoute, private api: ApiService, private auth: AuthService) {
    this.api.startLoading();
    this.api.getCurrentBookInfo(this.router.snapshot.params.id)
      .subscribe(bookInfo => {
        this.activeBook = bookInfo;
        this.api.stopLoading();
      }, () => {
        this.auth.logout();
        this.api.stopLoading();
      });

    this.api.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnInit(): void {
  }

}
