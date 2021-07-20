import { TestBed } from '@angular/core/testing';

import { DecoratorStoreService } from './decorator-store.service';

describe('DecoratorStoreService', () => {
  let service: DecoratorStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecoratorStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
