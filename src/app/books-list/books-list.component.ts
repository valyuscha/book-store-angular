import {Component} from '@angular/core';
import {ApiService, BooksService, LoaderService} from 'services';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent {
  constructor(public api: ApiService, public loader: LoaderService, public books: BooksService) {
  }
}
