import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService, AuthService, BooksService} from 'services';
import {IDefaultBook} from 'interfaces';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {
  books: IDefaultBook[] = [];
  isLoading = false;

  constructor(private api: ApiService, private auth: AuthService, private booksService: BooksService) {
    this.api.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnInit() {
    this.api.startLoading();
    this.api.getAllBooks()
      .subscribe(books => {
        this.booksService.setBooksForRender(books);
        this.booksService.setAllBooks(books);
        this.api.stopLoading();
      }, () => this.auth.logout())

    this.booksService.booksForRender$.subscribe(books => this.books = books);
  }

  ngOnDestroy() {
    // this.booksService.booksForRender$.unsubscribe();
  }
}
