import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmClearCartModalComponent } from './confirm-clear-cart-modal.component';

describe('ConfirmClearCartModalComponent', () => {
  let component: ConfirmClearCartModalComponent;
  let fixture: ComponentFixture<ConfirmClearCartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmClearCartModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmClearCartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
