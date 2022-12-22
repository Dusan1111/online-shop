import { Component, Injectable, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/imageService';
import * as CartActions from '../product-cart/state/actions/cart.actions'
import { Store } from '@ngrx/store';
import { CartState, getAllProductsFromCart, getTotalCartPrice } from './state/cart.reducer';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ProductCartComponent implements OnInit {

  //@Input() cart: Cart;
  ActivatePayPalComp: boolean = false;
  ActivateCartButton: boolean = true;
  productsInCart: any[]
  totalCartPrice: number;

  constructor(
    private imageService: ImageService,
    private store: Store<CartState>) { }

  ngOnInit(): void {

    this.store.select(getAllProductsFromCart).subscribe(
      products => { 
        this.productsInCart = products; 
      }
    );
    
    this.store.select(getTotalCartPrice).subscribe(
      totalCartPrice => { 
        this.totalCartPrice = totalCartPrice; 
      }
    );
  }

  removeFromCartClick(index: any) {
    this.store.dispatch(CartActions.removeProductFromCart( { index } ));
  }

  increaseAmmount(cartProduct: Product) {
    this.store.dispatch(CartActions.increaseProductAmmount( { cartProduct} ));
  }

  decreaseAmmount(cartProduct: Product) {
    if(cartProduct.ammount > 1)
      this.store.dispatch(CartActions.decreaseProductAmmount( { cartProduct} ));
  }

  closeClick(){
    this.ActivatePayPalComp = false;
  }
  
  showPaymentWindow() {
    this.ActivatePayPalComp = true;
  }

  expandButtonClick(expand: boolean) {
    this.ActivateCartButton = expand;
  }

  getImagePath(imageName: any) {
    return this.imageService.PhotoUrl + imageName;
  }
}
