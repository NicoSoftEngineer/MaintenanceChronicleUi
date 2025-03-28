import { TestBed } from '@angular/core/testing';

import { FormControlErrorHelperService } from './form-control-error-helper.service';

describe('FormControlErrorHelperService', () => {
  let service: FormControlErrorHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormControlErrorHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
