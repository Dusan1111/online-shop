import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { CartService } from '../services/cartService';
import { OrderService } from '../services/orderService';

@Component({
  selector: 'app-pay-pal',
  templateUrl: './pay-pal.component.html',
  styleUrls: ['./pay-pal.component.css']
})

export class PayPalComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean;
  totalCartPrice: string;
  
  constructor(
    private orderService: OrderService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.totalCartPrice = (this.cartService.cart.getTotalCartPrice / 117.7).toFixed(2);
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
              currency_code: 'EUR',
              value: this.totalCartPrice,
            },
        }]
      },
     
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {

        actions.order.get().then((details: any) => {
          alert("transaction successfull!");
        });
      },
      onClientAuthorization: (data) => {

        let newOrder =
        {
          postalCode: data.payer.address.postal_code,
          shippingAdress: data.payer.address.address_line_1,
          total: this.cartService.cart.getTotalCartPrice,
          status: 'In progress',
          orderItems: [] as any
        }
        
        this.cartService.cart.productsInCart.forEach((orderItem: any) => {
          let newOrderItem =
          {
            price: orderItem.price,
            ammount: orderItem.ammount,
            productId: orderItem.productId,
          }   
          newOrder.orderItems.push(newOrderItem)
        });
        
        this.orderService.addOrder(newOrder).subscribe(
            res => {
              this.showSuccess = true;
            },
          );
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
