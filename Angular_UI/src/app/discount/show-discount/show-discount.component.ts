import { Component, OnInit } from '@angular/core';
import { sortOption } from 'src/app/models/sortOption';
import { PaginationService } from 'src/app/services/pagination.service';
import { DiscountService } from 'src/app/services/discountService';

@Component({
  selector: 'app-show-discount',
  templateUrl: './show-discount.component.html',
  styleUrls: ['./show-discount.component.css']
})

export class ShowDiscountComponent implements OnInit {

  constructor(
    private discountService: DiscountService,
    private paginationService: PaginationService) { }

  closeDialog =
  {
    closeClick: () => this.closeClick(),
    saveClick:() => this.refreshDiscountList()
  };
  DiscountList: any = [];
  ModalTitle: string = "";
  ActivateAddEditDiscountComp: boolean = false;
  discount: any;
  discountName: string = "";
  status: any;
  DiscountIdFilter: string = "";
  DiscountNameFilter: string = "";
  DiscountListWithoutFilter: any = [];
  SortOptions: sortOption[];
  SelectedSortOption: sortOption;
  deletedSuccessfuly: boolean = false;

  Articles: any;
  page = 1;
  count = 0;
  tableSize = 8;
  tableSizesArr = [2, 4, 20];

  ngOnInit(): void {
    this.SortOptions = [
      new sortOption("By name ascending", true, "name"),
      new sortOption("By name descending", false, "name")
    ]
 

    this.refreshDiscountList();
  }

  addClick() {
    this.discount = {
      id: 0,
      name: ""
    }
    this.ModalTitle = "New discount";
    this.ActivateAddEditDiscountComp = true;
  }

  editClick(discount: any) {
    this.discount = discount;
    this.ModalTitle = "Edit discount";
    this.ActivateAddEditDiscountComp = true;
  }

  closeClick() {
    this.ActivateAddEditDiscountComp = false;
  }

  refreshDiscountList() {
    this.discountService.getDiscountList().subscribe(data => {
      this.DiscountList = data;
      this.DiscountListWithoutFilter = data;
    });
  }

  deleteClick(discount: any) {
    this.deletedSuccessfuly = false;
    this.discount = discount;
    this.discountName = discount.name;
  }

  deleteDiscount() {
    this.discountService.deleteDiscount(this.discount.id).subscribe((data) =>
    {
      this.refreshDiscountList();
      this.deletedSuccessfuly = true;
     });;
    
  }

  FilterFunction() {
    let ItemNameFilter = this.DiscountNameFilter;
    this.DiscountList = this.DiscountListWithoutFilter.filter(function (el: any) {
      return el.name.toLowerCase().includes(
        ItemNameFilter.toString().trim().toLowerCase())
    });
  }

  sortResult(prop: any, asc: any) {

    this.DiscountList = this.DiscountList.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop] ? -1 : 0));
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop] ? -1 : 0));
      }
    });
  }

  onChangeSort(event: any) {
    var selectedSortOptionName = event.target.value;
    if (selectedSortOptionName == "") {
      return;
    }
    this.SortOptions.forEach((sortOption: any) => {
      if (sortOption.name == selectedSortOptionName) {
        this.SelectedSortOption = sortOption;
      }
    });

    this.sortResult(this.SelectedSortOption.property, this.SelectedSortOption.asc);
  }
  // #region Pagination methods

  initalShowData() {
    this.tableSize = this.tableSizesArr[0];
    this.page = 1;
    this.showData();
  }

  showData(): void {
    this.paginationService.fetchPosts()
      .subscribe(
        res => {
          this.Articles = res;
        },
        err => {
          console.log(err);
        });
  }

  tabSize(event: any) {
    this.page = event;
    this.showData();
  }

  tableData(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.showData();
  }

  //  #endregion

}
