import { Injectable, signal, WritableSignal } from '@angular/core';
import { Product } from '../../product/models';
import { Cart } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CartApi {

  public cartItems: WritableSignal<Cart[]> = signal([]);

  constructor() { }

  addToCart(product: Product) {
    const index = this.cartItems().findIndex((item: Cart) =>
      item.productId === product.id);

    if (index === -1) {
      this.cartItems.update((items: Cart[]) => [...items, { productId: product.id, productDate: new Date().toString(), productQuantity: 1 }]);
    } else {
      this.cartItems.update((items: Cart[]) =>
        [
          ...items.slice(0, index),
          { ...items[index], productQuantity: items[index].productQuantity + 1 },
          ...items.slice(index + 1)
        ]);
    }
  }

  removeFromCart(product: Product) {
    this.cartItems.update((items: Cart[]) => items.filter(item =>
      item.productId !== product.id));
  }
}
