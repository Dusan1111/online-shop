import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { OrdersComponent } from './orders/orders.component';
import { DiscountComponent } from './discount/discount.component';
import { DetailsOrderComponent } from './orders/details-order/details-order.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'productCategories', component: ProductCategoryComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'discounts', component: DiscountComponent },
  { path: 'orderDetails', component: DetailsOrderComponent },
  { path: 'statistics', component: StatisticsComponent },
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
