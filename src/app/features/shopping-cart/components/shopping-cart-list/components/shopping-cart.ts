import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from "@angular/common";
import { CartOverview } from '../../../models';

@Component({
  selector: 'app-shopping-cart',
  imports: [
    CurrencyPipe,
    NgOptimizedImage
  ],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss'
})
export class ShoppingCart {
  public readonly productsCart: InputSignal<CartOverview[]> = input<CartOverview[]>([]);
  public readonly totalCartPrice: InputSignal<number> = input<number>(0);

  public increaseQuantityEvent: OutputEmitterRef<number> = output<number>();
  public decreaseQuantityEvent: OutputEmitterRef<number> = output<number>();
  public removeFromCartEvent: OutputEmitterRef<number> = output<number>();

  onIncreaseQuantity(id: number) {
    this.increaseQuantityEvent.emit(id);
  }

  onDecreaseQuantity(id: number) {
    this.decreaseQuantityEvent.emit(id);
  }

  onRemoveFromCart(id: number) {
    this.removeFromCartEvent.emit(id);
  }
}
