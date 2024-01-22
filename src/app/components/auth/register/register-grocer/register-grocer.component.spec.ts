import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGrocerComponent } from './register-grocer.component';

describe('RegisterGrocerComponent', () => {
  let component: RegisterGrocerComponent;
  let fixture: ComponentFixture<RegisterGrocerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterGrocerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterGrocerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
