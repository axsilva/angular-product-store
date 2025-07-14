import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartContainer } from './shopping-cart-container';

describe('ShoppingCartContainer', () => {
  let component: ShoppingCartContainer;
  let fixture: ComponentFixture<ShoppingCartContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
