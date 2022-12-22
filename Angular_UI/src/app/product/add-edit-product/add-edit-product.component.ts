import { Component, Input, OnInit } from '@angular/core';
import { ShowProductComponent } from '../show-product/show-product.component';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { sortOption } from 'src/app/models/sortOption';
import { ProductService } from 'src/app/services/productService';
import { ProductCategoryService } from 'src/app/services/productCategoryService';
import { ImageService } from 'src/app/services/imageService';

export class Discount {
  name: string;
  percentage: number;

  constructor(name: string, percentage: number) {
    this.name = name;
    this.percentage = percentage;
  }
}

// @ts-ignore: Object is possibly 'null'.
@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})

export class AddEditProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private categoryService: ProductCategoryService,
    private imageService: ImageService,
    private showProductComponent: ShowProductComponent) {
  }

  @Input() product: any;
  addEditForm: FormGroup;
  id: string;
  name: string;
  price: number;
  discount: number;
  selectedProductCategoryId: any = "";
  imageName: string;
  imagePath: string;
  description: string;

  SortOptions: sortOption[];
  addEditFormSubmitted: boolean = false;

  selectedDiscountName: string;
  DiscountList: any[];
  ProductDiscounts: any[] = [];
  discountPercentage: number;

  ProductCategories$ = this.categoryService.productCategories$;
  //forGroup koji bindujem na html i sluzi za validiranje forme

  ngOnInit(): void {
    this.id = this.product.id;
    this.name = this.product.name;
    this.price = this.product.price;
    this.selectedProductCategoryId = this.product.productCategoryId;

    this.imageName = this.product.imageName;
    if (this.imageName == undefined) {
      this.imageName = "questionMark.png"
    }

    this.imagePath = this.imageService.PhotoUrl + this.imageName;
    this.description = this.product.description;
    this.discount = this.product.discount;

    if (this.selectedProductCategoryId == undefined) {
      this.selectedProductCategoryId = "";
    }

    this.DiscountList = [
      new Discount("Regular discount", 0),
      new Discount("Loyalty discount", 0),
    ]

    this.addEditForm = new FormGroup
      (
        {
          productName: new FormControl('',[Validators.required, Validators.maxLength(20) ]),
          productPrice: new FormControl('', [ Validators.required, Validators.min(1), Validators.pattern(/^(0|[1-9]\d*)?$/)]),
          productCategory: new FormControl('', [Validators.required]),
          productDescription: new FormControl('', [Validators.maxLength(250)]),
          productDiscount: new FormControl('', [ Validators.max(100), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
        }
      )
  }

  //#region  Validation properties
  get productName() {
    return this.addEditForm.get('productName');
  }

  get productDiscount() {
    return this.addEditForm.get('productDiscount');
  }

  get image() {
    return this.addEditForm.get('image');
  }

  get productPrice() {
    return this.addEditForm.get('productPrice');

  }

  get productCategory() {
    return this.addEditForm.get('productCategory');
  }

  get productDescription() {
    return this.addEditForm.get('productDescription');
  }

  //#endregion 

  //#region Service methods

  addProduct() {
    this.addEditFormSubmitted = true;
    var newProduct =
    {
      name: this.name,
      price: this.price,
      ammount: 0,
      productCategoryId: this.selectedProductCategoryId,
      imageName: this.imageName,
      description: this.description,
      discount: this.discount
    };

    this.productService.addProduct(newProduct)
      .subscribe(
        res => {
          this.showProductComponent.refreshProductList();
          this.addEditFormSubmitted = false;
        }
      );
  }

  updateProduct() {
    this.addEditFormSubmitted = true;
    var updateProduct =
    {
      id: this.id,
      name: this.name,
      price: this.price,
      productCategoryId: this.selectedProductCategoryId,
      imageName: this.imageName,
      description: this.description,
      discount: this.discount
    };

    this.productService.updateProduct(updateProduct.id, updateProduct)
      .subscribe(
        res => {
          this.showProductComponent.refreshProductList();
          this.addEditFormSubmitted = false;
        }
      );
  }

  //#endregion
  removeDiscount(discount: any) {
    this.ProductDiscounts.splice(discount, 1);
  }


  addDiscountToProduct() {
    var newProductDiscount =
    {
      name: this.selectedDiscountName,
      discountPercentage: this.discount,

    };

    this.ProductDiscounts.push(newProductDiscount);
  }
  onImageUpload(event: any) {
    var image = event.target.files[0];

    if (image) {

      const formData = new FormData();
      formData.append('productImageName', image, image.name);

      this.imageService.uploadImage(formData).subscribe((res) => {
        if (res) {
          this.imageName = res.toString();
          this.imagePath = this.imageService.PhotoUrl + this.imageName;
        }
      }
      );
    }
  }

  onChangeDiscount(event: any) {
    this.selectedDiscountName = event.target.value;
  }

  onChangeCategory(event: any) {
    this.selectedProductCategoryId = event.target.value;
  }

}
