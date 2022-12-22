import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ShowProductComponent } from './product/show-product/show-product.component';
import { AddEditProductComponent } from './product/add-edit-product/add-edit-product.component';
import { PaginationService } from './services/pagination.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { AddEditProductCategoryComponent } from './product-category/add-edit-product-category/add-edit-product-category.component';
import { ShowProductCategoryComponent } from './product-category/show-product-category/show-product-category.component';
import { DetailsProductComponent } from './product/details-product/details-product.component';
import { ProductCartComponent } from './product/product-cart/product-cart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PayPalComponent } from './pay-pal/pay-pal.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { LogSignInComponent } from './log-sign-in/log-sign-in.component';
import { AlertModule } from 'ngx-alerts';
import { NgxPopper } from 'angular-popper';
import { OrdersComponent } from './orders/orders.component';
import { ShowOrdersComponent } from './orders/show-orders/show-orders.component';
import { DiscountComponent } from './discount/discount.component';
import { AddEditDiscountComponent } from './discount/add-edit-discount/add-edit-discount.component';
import { ShowDiscountComponent } from './discount/show-discount/show-discount.component';
import { DetailsOrderComponent } from './orders/details-order/details-order.component';
import { AddProductReviewComponent } from './product/add-product-review/add-product-review.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ShowStatisticsComponent } from './statistics/show-statistics/show-statistics.component';
import { ChartsModule } from 'ng2-charts';
import { AuthenticationService } from './services/authenticationService';
import { DiscountService } from './services/discountService';
import { OrderService } from './services/orderService';
import { ProductCategoryService } from './services/productCategoryService';
import { ProductService } from './services/productService';
import { ProductReviewService } from './services/productReviewService';
import { ServiceBase } from './services/serviceBase';
import { StatisticsService } from './services/statisticsService';
import { ImageService } from './services/imageService';
import { CartService } from './services/cartService';
import { StoreModule } from '@ngrx/store';
import { SearchPipe } from './pipes/searchPipe';
import { cartReducer } from './product/product-cart/state/cart.reducer';
import { environment } from '../environments/environment.prod';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
    ProductCartComponent,
    ProductComponent,
    ShowProductComponent,
    AddEditProductComponent,
    ProductCategoryComponent,
    AddEditProductCategoryComponent,
    ShowProductCategoryComponent,
    DetailsProductComponent,
    PayPalComponent,
    LogSignInComponent,
    OrdersComponent,
    ShowOrdersComponent,
    DiscountComponent,
    AddEditDiscountComponent,
    ShowDiscountComponent,
    DetailsOrderComponent,
    AddProductReviewComponent,
    StatisticsComponent,
    ShowStatisticsComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    NgxPayPalModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionX:"right", positionY:"top"}),
    NgxPopper,
    ChartsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ 
      name: "NgRx Demo App Devtools",
      maxAge: 25, 
      logOnly: environment.production
     }),
    StoreModule.forFeature('cart', cartReducer)  
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    ServiceBase,
    AuthenticationService,
    DiscountService,
    ImageService,
    OrderService,
    ProductCategoryService,
    ProductService,
    ProductReviewService,
    StatisticsService,
    PaginationService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
