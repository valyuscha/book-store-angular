import { TestBed } from '@angular/core/testing';

import { GuardIfUserNotLoggedInService } from './guard-if-user-not-logged-in.service';

describe('GuardIfUserNotLoggedInService', () => {
  let service: GuardIfUserNotLoggedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardIfUserNotLoggedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
