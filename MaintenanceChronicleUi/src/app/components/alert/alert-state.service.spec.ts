import { TestBed } from '@angular/core/testing';

import { AlertStateService } from './alert-state.service';

describe('AlertStateService', () => {
  let service: AlertStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
