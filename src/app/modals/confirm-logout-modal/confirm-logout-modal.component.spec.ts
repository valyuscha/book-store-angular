import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLogoutModalComponent } from './confirm-logout-modal.component';

describe('ConfirmLogoutModalComponent', () => {
  let component: ConfirmLogoutModalComponent;
  let fixture: ComponentFixture<ConfirmLogoutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmLogoutModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmLogoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
