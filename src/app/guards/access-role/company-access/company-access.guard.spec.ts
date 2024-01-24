import { TestBed } from '@angular/core/testing';

import { CompanyAccessGuard } from './company-access.guard';

describe('CompanyAccessGuard', () => {
  let guard: CompanyAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompanyAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
