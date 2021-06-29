import { TestBed } from '@angular/core/testing';

import { AllBooksResolver } from './all-books.resolver';

describe('AllBooksResolver', () => {
  let resolver: AllBooksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AllBooksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
