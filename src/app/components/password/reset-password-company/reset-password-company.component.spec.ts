import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordCompanyComponent } from './reset-password-company.component';

describe('ResetPasswordCompanyComponent', () => {
  let component: ResetPasswordCompanyComponent;
  let fixture: ComponentFixture<ResetPasswordCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordCompanyComponent]
    });
    fixture = TestBed.createComponent(ResetPasswordCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
