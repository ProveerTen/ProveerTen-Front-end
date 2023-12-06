import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularProductsSliderComponent } from './popular-products-slider.component';

describe('PopularProductsSliderComponent', () => {
  let component: PopularProductsSliderComponent;
  let fixture: ComponentFixture<PopularProductsSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularProductsSliderComponent]
    });
    fixture = TestBed.createComponent(PopularProductsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
