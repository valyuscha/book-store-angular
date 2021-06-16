import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksCatalogFiltersComponent } from './books-catalog-filters.component';

describe('BooksCatalogFiltersComponent', () => {
  let component: BooksCatalogFiltersComponent;
  let fixture: ComponentFixture<BooksCatalogFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksCatalogFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksCatalogFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
