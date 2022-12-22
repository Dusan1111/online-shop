import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserBase } from 'src/app/browserBase';
import { Cart } from 'src/app/models/cart';
import { sortOption } from 'src/app/models/sortOption';
import { PaginationService } from 'src/app/services/pagination.service';
import { AuthenticationService } from 'src/app/services/authenticationService';
import { CartService } from 'src/app/services/cartService';
import { ImageService } from 'src/app/services/imageService';
import { ProductService } from 'src/app/services/productService';
import { ProductCategoryService } from 'src/app/services/productCategoryService';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import * as CartActions from '../product-cart/state/actions/cart.actions'
import { Store } from '@ngrx/store';
import { CartState } from '../product-cart/state/cart.reducer';
import { productCategory } from 'src/app/models/productCategory';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})

export class ShowProductComponent extends BrowserBase implements OnInit {

  constructor(
    private imageService: ImageService,
    private authentificationService: AuthenticationService,
    paginationService: PaginationService, 
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private productCategoryService: ProductCategoryService,
    private store: Store<CartState>) {

    super(paginationService);
  }

  categories: any = [];
  ModalTitle: string = "";
  ActivateAddEditProductComp: boolean = false;
  ActivateGetDetailsProductComp: boolean = false;
  product: any;
  productId: any;
  status: any;
  cart: Cart;
  tableView: boolean = true;
  currentRate: any;
  fromPrice: number = 0;
  toPrice: number = 0;

  productCategories$ = this.productCategoryService.productCategories$;
  sortedAndFilteredList$ = this.productService.products$;

  // sortedAndFilteredList$ = combineLatest([ this.products$, this.productCategories$]).pipe(
  //   map(([products, categories]) =>
  //   products.map((product:Product) => ({
  //       ...product,
  //       // productCategory: categories.find((c: productCategory) => product.productCategoryId == c.id),
  //       searchKey:[product.name]
  //     }) as Product),
  //   )
  // );

  ngOnInit(): void {

    super.ngOnInit();

    this.currentRate = 3.14;
    this.cart = this.cartService.cart;
   
    //additional sorting criteria
    this.SortOptions.push(new sortOption("By price ascending", true, "price"));
    this.SortOptions.push(new sortOption("By price descending", false, "price"));


    this.route.queryParams.subscribe(params => {
      this.categories = [];
      this.categories = params['categories'];
      this.fromPrice = params['fromPrice'];
      this.toPrice = params['toPrice'];
      this.refreshProductList();
     });
  }

  setTableView(tableView: any) {
    this.tableView = tableView;
  }

  addClick() {
    this.product = {
      id: 0,
      name: "",
      discount: 0
    }
    this.ModalTitle = "New product";
    this.ActivateAddEditProductComp = true;
  }

  editClick(product: any) {
    this.product = product;
    this.ModalTitle = "Edit product";
    this.ActivateAddEditProductComp = true;
  }

  getDetailsClick(product: any) {
    this.product = product;
    this.ModalTitle = "Product details";
    this.ActivateGetDetailsProductComp = true;
  }

  addProductReviewClick(productId: any){
    this.productId = productId;
  }

  closeClick() {
    this.ActivateAddEditProductComp = false;
    this.ActivateGetDetailsProductComp = false;
    this.refreshProductList();
  }

  refreshProductList() {
    //ToDo: Fix filtering for price and 

    let filteredProducts: any = [];
    let from = this.fromPrice;
    let to = this.toPrice;
  
    this.sortedAndFilteredList$ = this.sortedAndFilteredList$.pipe(
      map((results) => {
          if (this.categories != undefined) {
              results.forEach((product: Product) => {
                     
                    let categoryArray = this.categories.toString().split(",");
                    categoryArray.forEach((category: any) => {
          
                      if (category === product.productCategory.name 
                       && !filteredProducts.some((p: { name: any })=>p.name === product.name) && 
                       ((this.toPrice == 0) || (product.price >= from && product.price <= to))) 
                            filteredProducts.push(product);
                    });
                  });
                }
            return filteredProducts;
          })
       );
  }

removeCategoryFilter(category: any) {
  const index = this.categories.indexOf(category);
  if (index > -1) {
    this.categories.splice(index, 1);
  }
  this.refreshProductList();
} 

  isAdmin() {
    return this.authentificationService.currentUser.role == "admin" ? true : false;
  }

  deleteClick(product: any) {
    if (confirm("Are you sure?")) {
      this.product = product;
      this.productService.deleteProduct(product.id).subscribe((data) =>
        this.refreshProductList()
      );;
    }
  }

  addProductToCart(product: Product) {

    let cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      discountedPrice: product.discountedPrice,
      ammount: 1,
      description: product.description,
      imageName: product.imageName
    } as Product

    this.store.dispatch(CartActions.addProductToCart(  { cartProduct } ));
  }

  FilterFunctionByPrice() {
    // let from = this.fromPrice;
    // let to = this.toPrice;

    //  this.sortedAndFilteredList# = this.listWithoutFilter.filter(function (el: any) {
    //    return (el.price as number >= from && el.price <= to);
    //  });
  }

  getImagePath(imageName: any) {
    return this.imageService.PhotoUrl + imageName;
  }
}
