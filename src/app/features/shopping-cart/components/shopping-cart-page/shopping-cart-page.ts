import { Component } from '@angular/core';
import { ShoppingCartContainer } from '../shopping-cart-list/containers/shopping-cart-container';

@Component({
  selector: 'app-shopping-cart-page',
  imports: [
    ShoppingCartContainer
  ],
  templateUrl: './shopping-cart-page.html',
})
export class ShoppingCartPage {

}
