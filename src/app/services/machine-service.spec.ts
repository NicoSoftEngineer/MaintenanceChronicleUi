import { TestBed } from '@angular/core/testing';

import { MachineService } from './machine-service';

describe('MachineServiceService', () => {
  let service: MachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
