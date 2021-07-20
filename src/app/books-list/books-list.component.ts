import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ApiService, BooksService} from 'services';
import {Select} from '@ngxs/store';
import {LoaderState} from '../state/loader.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksListComponent {
  @Select(LoaderState.getIsLoadingStatus) isLoading!: Observable<boolean>;

  constructor(public api: ApiService, public books: BooksService) {
  }

  trackByFn(index: string | number) {
    return index;
  }
}
