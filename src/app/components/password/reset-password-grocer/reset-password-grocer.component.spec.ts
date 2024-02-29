import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordGrocerComponent } from './reset-password-grocer.component';

describe('ResetPasswordGrocerComponent', () => {
  let component: ResetPasswordGrocerComponent;
  let fixture: ComponentFixture<ResetPasswordGrocerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordGrocerComponent]
    });
    fixture = TestBed.createComponent(ResetPasswordGrocerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
