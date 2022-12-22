import { Directive, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ISearchable } from "./interfaces/ISearchable";
import { sortOption } from "./models/sortOption";
import { PaginationService } from "./services/pagination.service";

@Directive()

export abstract class BrowserBase implements OnInit {

    constructor(protected service: PaginationService) { }
   
    //#region  Sorting fields

    public SortOptions: sortOption[];
    public SelectedSortOption: sortOption;

    sortedAndFilteredList: any = [];
    listWithoutFilter: any = [];

    sortedAndFilteredList$: Observable<ISearchable[]>
    listWithoutFilter$: Observable<ISearchable[]>
    
    //#endregion

    //#region Filter

    SearchTerm: string = "";

    //#region 

    // #region Pagination Fields
 
    Articles: any;
    page = 1;
    count = 0;
    tableSize = 8;
    tableSizesArr = [2, 4, 20];

    //#endregion

    ngOnInit(): void {
        
    // Default browser sorting is by name
    
        this.SortOptions = [
            new sortOption("By name ascending", true, "name"),
            new sortOption("By name descending", false, "name")
        ]
        this.initalShowData();
    }

    // #region Pagination methods

    initalShowData() {
        this.tableSize = this.tableSizesArr[0];
        this.page = 1;
        this.showData();
    }

    showData(): void {
        this.service.fetchPosts()
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


 //#region  Sort methods

 sortResult(prop: any, asc: any) {

  this.sortedAndFilteredList$ = this.sortedAndFilteredList$.pipe(
    map((results) => {
      results.sort(function (a: any, b: any) {
              if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop] ? -1 : 0));
              }
              else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop] ? -1 : 0));
              }
            });
          return results;
      })
    );
  }

  onChangeSort(event: any) {
    var selectedSortOptionName = event.target.value;
    
    if(selectedSortOptionName == "") {
      return;
    }
    this.SortOptions.forEach((sortOption: any) => {
      if (sortOption.name == selectedSortOptionName) {
          this.SelectedSortOption = sortOption;
      }
    });

    this.sortResult(this.SelectedSortOption.property,  this.SelectedSortOption.asc);
 }

 //#endregion
 
}