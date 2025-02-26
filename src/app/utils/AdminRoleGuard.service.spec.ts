/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AdminRoleGuard } from './admin-role-guard';

describe('Service: AdminRoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminRoleGuard]
    });
  });

  it('should ...', inject([AdminRoleGuard], (service: AdminRoleGuard) => {
    expect(service).toBeTruthy();
  }));
});
