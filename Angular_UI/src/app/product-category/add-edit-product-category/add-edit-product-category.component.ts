import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductCategoryService } from 'src/app/services/productCategoryService';

@Component({
  selector: 'app-add-edit-product-category',
  templateUrl: './add-edit-product-category.component.html',
  styleUrls: ['./add-edit-product-category.component.css']
})
export class AddEditProductCategoryComponent implements OnInit {

  constructor(private productCategoryService: ProductCategoryService) { }

  @Input() productCategory: any;
  @Input() closeDialog: any

  form: FormGroup | undefined;
  id: string | undefined;
  name: string | null;
  savedSuccessful: boolean = false;

  addEditForm = new FormGroup
    (
      {
        productCategoryName: new FormControl(null,
          [
            Validators.required,
            Validators.maxLength(20)
          ]),
      }
    )

  ngOnInit(): void {
    this.id = this.productCategory.id;
    this.name = this.productCategory.name;
  }

  //#region  Validation properties

  get productCategoryName() {
    return this.addEditForm.get('productCategoryName');
  }

  //#endregion 

  //#region Service methods
  closeClick() {
    this.savedSuccessful = true;
    this.closeDialog.closeClick();
}
  addProductCategory() {

    var newProductCategory =
    {
      name: this.name,
    };
    this.productCategoryService.addProductCategory(newProductCategory)
      .subscribe(
        res => {
          this.savedSuccessful = true;
          this.closeDialog.saveClick();
        }
      );
  }

  okClick(){
    this.savedSuccessful = false;
  }

  updateProductCategory() {

    var updateProductCategory =
    {
      id: this.id,
      name: this.name,

    };

    this.productCategoryService.updateProductCategory(updateProductCategory.id, updateProductCategory)
      .subscribe(
        res => {
          this.savedSuccessful = true;
          this.closeDialog.saveClick();
        }
      );
  }

  //#endregion

}
