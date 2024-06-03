import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBackAddComponent } from './product-back-add.component';

describe('ProductBackAddComponent', () => {
  let component: ProductBackAddComponent;
  let fixture: ComponentFixture<ProductBackAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductBackAddComponent]
    });
    fixture = TestBed.createComponent(ProductBackAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
