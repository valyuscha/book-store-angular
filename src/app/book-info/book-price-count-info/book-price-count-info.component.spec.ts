import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPriceCountInfoComponent } from './book-price-count-info.component';

describe('BookPriceCountInfoComponent', () => {
  let component: BookPriceCountInfoComponent;
  let fixture: ComponentFixture<BookPriceCountInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPriceCountInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPriceCountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
