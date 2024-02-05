import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProviderComponent } from './create-provider.component';

describe('CreateProviderComponent', () => {
  let component: CreateProviderComponent;
  let fixture: ComponentFixture<CreateProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProviderComponent]
    });
    fixture = TestBed.createComponent(CreateProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
