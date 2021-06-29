import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedBookToCartModalComponent } from './added-book-to-cart-modal.component';

describe('AddedBookToCartModalComponent', () => {
  let component: AddedBookToCartModalComponent;
  let fixture: ComponentFixture<AddedBookToCartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedBookToCartModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedBookToCartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
