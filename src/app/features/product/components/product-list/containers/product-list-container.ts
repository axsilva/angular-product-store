import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { ProductList } from '../components/product-list';
import { ProductApi } from '../../../services/product-api';
import { Product } from '../../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartApi } from '../../../../shopping-cart/services/cart-api';
import { ToastApi } from '../../../../../shared/services/toast-api';
import { ToastTypeEnum } from '../../../../../shared/models';

@Component({
  selector: 'app-product-list-container',
  imports: [
    ProductList
  ],
  templateUrl: './product-list-container.html',
})
export class ProductListContainer {
  private productService = inject(ProductApi);
  private shoppingCartService = inject(CartApi);
  private toastService = inject(ToastApi);

  public products: Signal<Product[]> = toSignal(this.productService.getProductResults(), {initialValue: []});
  public categories: Signal<string[]> = toSignal(this.productService.getCategories(), {initialValue: []});
  public selectedCategory: WritableSignal<string> = signal(this.productService.getSelectedCategory());

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
    this.toastService.show('Product added to your cart', ToastTypeEnum.SUCCESS);
  }

  selectCategory(selectedCategory: string) {
    this.productService.filterProducts(selectedCategory);
  }
}
