import { TestBed } from '@angular/core/testing';

import { GuardGetAllBooksGuard } from './guard-get-all-books.guard';

describe('GuardGetAllBooksGuard', () => {
  let guard: GuardGetAllBooksGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardGetAllBooksGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
