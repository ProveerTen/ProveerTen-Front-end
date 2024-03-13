import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedProductPricesComponent } from './suggested-product-prices.component';

describe('SuggestedProductPricesComponent', () => {
  let component: SuggestedProductPricesComponent;
  let fixture: ComponentFixture<SuggestedProductPricesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestedProductPricesComponent]
    });
    fixture = TestBed.createComponent(SuggestedProductPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
