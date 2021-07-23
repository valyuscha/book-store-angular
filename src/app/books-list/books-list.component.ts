import {ChangeDetectionStrategy, Component, ChangeDetectorRef, OnInit, ViewRef} from '@angular/core';
import {ApiService} from 'services';
import {IDefaultBook} from 'interfaces';
import {FilterData} from './books-catalog-filters/books-catalog-filters.component';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksListComponent implements OnInit {
  private _list: IDefaultBook[] = [];
  list: IDefaultBook[] = [];
  isLoading = true;

  constructor(private api: ApiService, private cdRef: ChangeDetectorRef) {
  }

  trackByFn(index: string | number) {
    return index;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getAllBooks().subscribe(result => {
      this._list = result;
      this.isLoading = false;
      this.applyFilter({name: '', price: []});
    });
  }

  applyFilter(filter: FilterData): void {
    this.list = this._list.filter(item => {
      if (filter.price.length > 0) {
        if (item.price < filter.price[0]) {
          return false;
        }
      }
      if (filter.price.length > 1) {
        if (item.price > filter.price[1]) {
          return false;
        }
      }
      return item.title.toLowerCase().startsWith(filter.name);
    });
    this.detectChanges();
  }

  private detectChanges() {
    if (!(this.cdRef as ViewRef).destroyed) {
      this.cdRef.detectChanges();
    }
  }
}
