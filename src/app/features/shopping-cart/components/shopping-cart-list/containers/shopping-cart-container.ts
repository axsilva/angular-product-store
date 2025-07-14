import { Component, computed, inject, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ShoppingCart } from '../components/shopping-cart';
import { CartApi } from '../../../services/cart-api';
import { ProductApi } from '../../../../product/services/product-api';
import { Product } from '../../../../product/models';
import { Cart, CartOverview } from '../../../models';
import { ToastApi } from '../../../../../shared/services/toast-api';
import { ToastTypeEnum } from '../../../../../shared/models';

@Component({
  selector: 'app-shopping-cart-container',
  imports: [
    ShoppingCart
  ],
  templateUrl: './shopping-cart-container.html'
})
export class ShoppingCartContainer {
  private shoppingCartService = inject(CartApi);
  private productService = inject(ProductApi);
  private toastService = inject(ToastApi);

  public cartList: WritableSignal<Cart[]> = this.shoppingCartService.cartItems;
  public productList: Signal<Product[]> = toSignal(this.productService.getProducts(), {initialValue: []});

  public productsCart: Signal<CartOverview[]> = computed(() => {
    let arr: CartOverview[] = [];

    this.cartList().forEach((cart: Cart) => {
      const selectedProduct = this.productList().find((product: Product) => product.id === cart.productId)
      arr.push(<CartOverview>{
        id: selectedProduct?.id,
        image: selectedProduct?.image,
        title: selectedProduct?.title,
        quantity: cart.productQuantity,
        totalPrice: cart.productQuantity * (selectedProduct?.price || 0)
      });
    });

    return arr;
  });

  public totalCartPrice: Signal<number> = computed(() => {
    const priceList = this.productsCart().map((item: CartOverview) => item.totalPrice);

    return priceList.reduce((prev, curr) => prev + curr, 0);
  })

  increaseQuantity(id: number) {
    const selectCartProduct: Cart = <Cart>this.cartList().find((item: Cart) => item.productId === id);

    this.cartList.update((value: Cart[]) => value.map((item: Cart) =>
      item.productId === id
        ? {...item, productQuantity: ++selectCartProduct.productQuantity}
        : item));
  }

  decreaseQuantity(id: number) {
    const selectCartProduct: Cart = <Cart>this.cartList().find((item: Cart) => item.productId === id);

    this.cartList.update((value: Cart[]) => value.map((item: Cart) =>
      item.productId === id
        ? {...item, productQuantity: --selectCartProduct.productQuantity}
        : item));
  }

  removeFromCart(id: number) {
    const selectProduct: Product = <Product>this.productList().find((item: Product) => item.id === id);

    this.shoppingCartService.removeFromCart(selectProduct);
    this.toastService.show('Product removed from the cart', ToastTypeEnum.ERROR);
  }
}
