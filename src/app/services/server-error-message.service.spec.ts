import { TestBed } from '@angular/core/testing';

import { ServerErrorMessageService } from './server-error-message.service';

describe('ServerErrorMessageService', () => {
  let service: ServerErrorMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerErrorMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
