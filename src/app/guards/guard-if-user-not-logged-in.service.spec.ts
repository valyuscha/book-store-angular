import { TestBed } from '@angular/core/testing';

import { GuardIfUserNotLoggedIn } from './guard-if-user-not-logged-in.service';

describe('GuardIfUserNotLoggedInService', () => {
  let service: GuardIfUserNotLoggedIn;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardIfUserNotLoggedIn);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
