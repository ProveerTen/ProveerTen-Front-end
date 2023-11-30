import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrocerInfoComponent } from './grocer-info.component';

describe('GrocerInfoComponent', () => {
  let component: GrocerInfoComponent;
  let fixture: ComponentFixture<GrocerInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrocerInfoComponent]
    });
    fixture = TestBed.createComponent(GrocerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
