import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGrocerComponent } from './login-grocer.component';

describe('LoginGrocerComponent', () => {
  let component: LoginGrocerComponent;
  let fixture: ComponentFixture<LoginGrocerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginGrocerComponent]
    });
    fixture = TestBed.createComponent(LoginGrocerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
