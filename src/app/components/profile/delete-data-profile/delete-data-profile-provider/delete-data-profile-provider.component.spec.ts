import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDataProfileProviderComponent } from './delete-data-profile-provider.component';

describe('DeleteDataProfileProviderComponent', () => {
  let component: DeleteDataProfileProviderComponent;
  let fixture: ComponentFixture<DeleteDataProfileProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDataProfileProviderComponent]
    });
    fixture = TestBed.createComponent(DeleteDataProfileProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
