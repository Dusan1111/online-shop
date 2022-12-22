import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiscountService } from 'src/app/services/discountService';

@Component({
  selector: 'app-add-edit-discount',
  templateUrl: './add-edit-discount.component.html',
  styleUrls: ['./add-edit-discount.component.css']
})
export class AddEditDiscountComponent implements OnInit {

  constructor(private discountService: DiscountService) { }

  @Input() discount: any;
  @Input() closeDialog: any

  form: FormGroup | undefined;
  id: string | undefined;
  name: string | null;
  savedSuccessful: boolean = false;
  ammount: any;
  selectedDiscountType: any;

  addEditForm = new FormGroup
    (
      {
        discountName: new FormControl(null,
          [
            Validators.required,
            Validators.maxLength(20)
          ]),
          discountType: new FormControl("",
          [
            Validators.required,
          ]),
        discountAmmount: new FormControl(null,
          [
            Validators.required,
          ]),
      }
    )
  ngOnInit(): void {
    this.id = this.discount.id;
    this.name = this.discount.name;
    this.ammount = this.discount.ammount
    this.selectedDiscountType = this.discount.discountType;
    if(this.selectedDiscountType == undefined) {
        this.selectedDiscountType = "";
    }
  }

  //#region  Validation properties

  get discountName() {
    return this.addEditForm.get('discountName');

  }
  
  get discountType() {
    return this.addEditForm.get('discountType');
  }

  get discountAmmount() {
  return this.addEditForm.get('discountAmmount');
}
  
  //#endregion

  //#region Service methods

  closeClick() {
    this.savedSuccessful = true;
    this.closeDialog.closeClick();
  }
  addDiscount() {

    var newDiscount =
    {
      name: this.name,
    };
    this.discountService.addDiscount(newDiscount)
      .subscribe(
        res => {
          this.savedSuccessful = true;
          this.closeDialog.saveClick();
        }
      );
  }

  okClick() {
    this.savedSuccessful = false;
  }

  discountTypeChanged(event: any) {
    this.selectedDiscountType = event.value;
  }

  updateDiscount() {

    var updateDiscount =
    {
      id: this.id,
      name: this.name,

    };

    this.discountService.updateDiscount(updateDiscount.id, updateDiscount)
      .subscribe(
        res => {
          this.savedSuccessful = true;
          this.closeDialog.saveClick();
        }
      );
  }

  //#endregion

}
