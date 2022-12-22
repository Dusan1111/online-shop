import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Cart } from './models/cart';
import { CartState, getProductsInCartCount } from './product/product-cart/state/cart.reducer';
import { AuthenticationService } from './services/authenticationService';
import { CartService } from './services/cartService';
import { ProductCategoryService } from './services/productCategoryService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor (
    private authenticationService: AuthenticationService,
    private categoryService: ProductCategoryService,
    private cartService: CartService,
    private router: Router,
    private store: Store<CartState>) { }

  ProductCategoryList$ = this.categoryService.productCategories$;

  FilterCategories: any = [];
  showLogSignInForm: boolean = false;
  menuButtonVisible: boolean = true;
  fromPrice: number = 0;
  toPrice: number = 0;
  cart: Cart;
  showCartFlag: boolean = false;
  totalCartCount: number = 0;

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    
    this.store.select(getProductsInCartCount).subscribe(
      totalCount => { 
        this.totalCartCount = totalCount; 
      }
    );
  }

  closeClick() {
    this.showLogSignInForm = false;
  }

  openLoginForm() {
    this.showLogSignInForm = true;
  }

  selectCategoryFilter(evt: any, category: any) {
    let isChecked = evt.target.checked
    if (isChecked) {
      this.FilterCategories.push(category);
    }
    else {
      const index = this.FilterCategories.indexOf(category);
      if (index > -1) {
        this.FilterCategories.splice(index, 1);
      }
    }
  }

  applyCategoryFilter() {
    const queryParams: any = {};
    queryParams.categories = this.FilterCategories;
    queryParams.fromPrice = this.fromPrice;
    queryParams.toPrice = this.toPrice;

    const navigationExtras: NavigationExtras = {
      queryParams
    };
  
    this.router.navigate(['/products/'], navigationExtras);
  }

  sliderFunction(evt: any) {
    this.toPrice = evt.value;
  }

  showCart() {
    this.showCartFlag = !this.showCartFlag;
    if (this.showCartFlag) {
      document.getElementById("vertical-menu-cart").style.width = "350px";
    }
    else {
      document.getElementById("vertical-menu-cart").style.width = "0";
    }
  }

  priceSearch() {
    
    const queryParams: any = {};
    queryParams.categories = this.FilterCategories;
    queryParams.fromPrice = this.fromPrice;
    queryParams.toPrice = this.toPrice;

    const navigationExtras: NavigationExtras = {
      queryParams
    };

    this.router.navigate(['/products/'], navigationExtras);
  }

  logOut() {
    return this.authenticationService.logout();
  }

  get getUserName() {
    return this.authenticationService.currentUser.username;
  }

  isUserLoggedIn() {
    return this.authenticationService.loggedIn();
  }

  isAdmin() {
    return this.authenticationService.currentUser.role == "admin" ? true : false;
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    this.menuButtonVisible = true;
  }
  
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    this.menuButtonVisible = false;
  }
}
