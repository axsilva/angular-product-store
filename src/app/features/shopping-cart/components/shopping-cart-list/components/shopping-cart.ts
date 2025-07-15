import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { CartOverview, QuantityDirection } from '../../../models';

@Component({
  selector: 'app-shopping-cart',
  imports: [CurrencyPipe, NgOptimizedImage],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss',
})
export class ShoppingCart {
  public readonly productsCart: InputSignal<CartOverview[]> = input<
    CartOverview[]
  >([]);
  public readonly totalCartPrice: InputSignal<number> = input<number>(0);

  public changeQuantityEvent: OutputEmitterRef<{
    id: number;
    direction: QuantityDirection;
  }> = output<{ id: number; direction: QuantityDirection }>();
  public removeFromCartEvent: OutputEmitterRef<number> = output<number>();

  public quantityDirection = QuantityDirection;

  onChangeQuantity(id: number, direction: QuantityDirection) {
    this.changeQuantityEvent.emit({ id, direction });
  }

  onRemoveFromCart(id: number) {
    this.removeFromCartEvent.emit(id);
  }
}
