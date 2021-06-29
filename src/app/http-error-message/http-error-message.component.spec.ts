import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorMessageComponent } from './http-error-message.component';

describe('HttpErrorMessageComponent', () => {
  let component: HttpErrorMessageComponent;
  let fixture: ComponentFixture<HttpErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpErrorMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
