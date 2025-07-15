import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  private httpClient = inject(HttpClient);

  private readonly baseUrl = 'https://fakestoreapi.com';
  private readonly products$: Observable<Product[]>;
  private productsSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private selectedCategory: WritableSignal<string> = signal('');

  constructor() {
    this.products$ = this.productsSubject.pipe(
      switchMap((category: string) =>
        category ? this.getProductsByCategory(category) : this.getProducts()
      )
    );
  }

  getProductResults(): Observable<Product[]> {
    return this.products$;
  }

  filterProducts(category?: string) {
    this.productsSubject.next(category ?? '');
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProductsByCategory(category?: string): Observable<Product[]> {
    this.selectedCategory.set(category ?? '');
    return this.httpClient.get<Product[]>(
      `${this.baseUrl}/products/category/${category}`
    );
  }

  getCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseUrl}/products/categories`);
  }

  getSelectedCategory() {
    return this.selectedCategory();
  }
}
