import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IDefaultBook} from 'interfaces';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent {
  @Input() book: IDefaultBook = {
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
}
