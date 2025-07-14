import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { Product } from '../../../models';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
    FormsModule
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
  public readonly products: InputSignal<Product[]> = input<Product[]>([]);
  public readonly categories: InputSignal<string[]> = input<string[]>([]);
  public readonly selectedCategory: InputSignal<string> = input<string>('');

  public addToCartEvent: OutputEmitterRef<Product> = output<Product>();
  public selectCategoryEvent: OutputEmitterRef<string> = output<string>();

  onAddToCart(product: Product) {
    this.addToCartEvent.emit(product);
  }

  onSelectCategory(event: Event) {
    const category: string = (event.target as HTMLSelectElement).value;
    this.selectCategoryEvent.emit(category);
  }
}
