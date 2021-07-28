import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CartComponent} from './cart.component';
import {NgxsModule, Store} from '@ngxs/store';
import {CartState} from 'state';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApiService} from 'services';
import {Edit, Purchase, Remove} from 'actions';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let store: Store;

  beforeEach(async () => {
    const storeMock = jasmine.createSpyObj('Store', ['dispatch', 'select'])

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([CartState])
      ],
      declarations: [CartComponent],
      providers: [
        {provide: Store, useValue: storeMock},
        {provide: ApiService, useValue: {}}
      ]
    })
      .compileComponents();
    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dispatch', () => {
    component.setBooksNumber({id: '1', totalPrice: 34, title: '', price: 34, addedCount: 1, availableCount: 10}, 1);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should NOT call dispatch if books count < 0', () => {
    component.setBooksNumber({id: '1', totalPrice: 0, title: '', price: 34, addedCount: 0, availableCount: 10}, -1);
    expect(store.dispatch).not.toHaveBeenCalled();
  })

  it('should NOT call dispatch if books count > available count', () => {
    component.setBooksNumber({id: '1', totalPrice: 340, title: '', price: 34, addedCount: 10, availableCount: 10}, 1);
    expect(store.dispatch).not.toHaveBeenCalled();
  })

  it('should delete book', () => {
    spyOn(component, 'deleteBook').and.callThrough();
    component.setBooksNumber({id: '1', totalPrice: 34, title: '', price: 34, addedCount: 1, availableCount: 10}, -1);
    expect(component.deleteBook).toHaveBeenCalled();
  })

  // it('should NOT call dispatch if books count = 0', () => {
  //   const bookData = {id: '1', totalPrice: 34, title: '', price: 34, addedCount: 1, availableCount: 10};
  //   component.setBooksNumber(bookData, -1);
  //
  //   console.log(bookData.addedCount - 1);
  //   expect(store.dispatch).not.toHaveBeenCalled();
  // })

  it('should call dispatch with edit action', () => {
    component.setBooksNumber({id: '1', totalPrice: 34, title: '', price: 34, addedCount: 1, availableCount: 10}, 1);
    expect(store.dispatch).toHaveBeenCalledWith(new Edit({bookId: '1', number: 2}));
  });

  it('should call dispatch with delete action', () => {
    component.deleteBook('1');
    expect(store.dispatch).toHaveBeenCalledWith(new Remove('1'));
  })

  it('should call dispatch with purchase action', () => {
    component.purchase();
    expect(store.dispatch).toHaveBeenCalledWith(new Purchase());
  })
});
