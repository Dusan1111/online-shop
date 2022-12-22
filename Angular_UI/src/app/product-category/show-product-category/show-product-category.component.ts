import { Component, OnInit } from '@angular/core';
import { BrowserBase } from 'src/app/browserBase';
import { PaginationService } from 'src/app/services/pagination.service';
import { ProductCategoryService } from 'src/app/services/productCategoryService';

@Component({
  selector: 'app-show-product-category',
  templateUrl: './show-product-category.component.html',
  styleUrls: ['./show-product-category.component.css']
})

export class ShowProductCategoryComponent extends BrowserBase implements OnInit {
  
  sortedAndFilteredList$ = this.categoryService.productCategories$;

  constructor(
    private categoryService: ProductCategoryService,
    paginginationService: PaginationService) {
    
      super(paginginationService);
  }

  closeDialog =
    {
      closeClick: () => this.closeClick(),
    };

  ModalTitle: string = "";
  ActivateAddEditProductCategoryComp: boolean = false;
  productCategory: any;
  status: any;
  deletedSuccessfuly: boolean = false;
  productCategoryName = "";

  ngOnInit(): void {
    super.ngOnInit();
  }

  addClick() {
    this.productCategory = {
      id: 0,
      name: ""
    }
    this.ModalTitle = "New product category";
    this.ActivateAddEditProductCategoryComp = true;
  }

  editClick(productCategory: any) {
    this.productCategory = productCategory;
    this.ModalTitle = "Edit product category";
    this.ActivateAddEditProductCategoryComp = true;
  }

  closeClick() {
    this.ActivateAddEditProductCategoryComp = false;
  }

  deleteClick(productCategory: any) {
    this.deletedSuccessfuly = false;
    this.productCategory = productCategory;
    this.productCategoryName = productCategory.name;
  }

  deleteCategory() {
    this.categoryService.deleteProductCategory(this.productCategory.id).subscribe((data) => {
      this.deletedSuccessfuly = true;
    });;
  }
}
