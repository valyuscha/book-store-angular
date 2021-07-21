import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';

export interface FilterData {
  name: string;
  price: number[];
}

@Component({
  selector: 'app-books-catalog-filters',
  templateUrl: './books-catalog-filters.component.html',
  styleUrls: ['./books-catalog-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksCatalogFiltersComponent {
  areFiltersVisible: boolean = window.innerWidth > 400;
  current: FilterData = {
    name: '',
    price: []
  }
  @Output() changeFilter = new EventEmitter<FilterData>();

  setPrice(event: any) {
    this.current.price = JSON.parse(event.srcElement.value);
    this.changeFilter.emit({...this.current});
  }

  setName(event: any) {
    this.current.name = event.srcElement.value.toLowerCase().trim();
    this.changeFilter.emit({...this.current});
  }
}
