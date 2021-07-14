import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BooksService} from 'services';
import {filterBooksByPrice} from './filterBooksByPrice';
import {filterBooksByName} from './filterBooksByName';

@Component({
  selector: 'app-books-catalog-filters',
  templateUrl: './books-catalog-filters.component.html',
  styleUrls: ['./books-catalog-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksCatalogFiltersComponent {
  areFiltersVisible: boolean = window.innerWidth > 400;

  constructor(private books: BooksService) {
  }

  filterByPrice(selectValue: string, searchValue: string) {
    const filteredByNameBooks = filterBooksByName(searchValue, this.books.allBooks);
    const filteredByPriceBooks = filterBooksByPrice(selectValue, filteredByNameBooks);

    this.books.setBooksForRender(filteredByPriceBooks);
  }

  filterByName(searchValue: string, selectValue: string) {
    const filteredByPriceBooks = filterBooksByPrice(selectValue, this.books.allBooks);
    const filteredByNameBooks = filterBooksByName(searchValue, filteredByPriceBooks);

    this.books.setBooksForRender(filteredByNameBooks);
  }
}
