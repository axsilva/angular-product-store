import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: 'products',
    loadComponent: () => import('./features/product/components/product-page/product-page').then(m => m.ProductPage),
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/shopping-cart/components/shopping-cart-page/shopping-cart-page').then(m => m.ShoppingCartPage),
  }
];
