import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from 'services';
import {IDefaultBook} from '../interfaces';
import {Observable, Subscription} from 'rxjs';
import {Select} from '@ngxs/store';
import {LoaderState} from '../state/loader.state';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookInfoComponent implements OnInit, OnDestroy {
  @Select(LoaderState.getIsLoadingStatus) isLoading!: Observable<boolean>;
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

  constructor(public router: ActivatedRoute, public api: ApiService) {
  }

  ngOnInit() {
    this.subscription = this.router.data.subscribe(book => {
      this.activeBook = book.book;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
