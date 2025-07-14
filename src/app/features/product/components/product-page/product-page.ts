import { Component } from '@angular/core';
import { ProductListContainer } from '../product-list/containers/product-list-container';

@Component({
  selector: 'app-product-page',
  imports: [
    ProductListContainer,
  ],
  templateUrl: './product-page.html',
})
export class ProductPage {}
