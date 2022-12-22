import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { productCategory } from "../models/productCategory";
import { ServiceBase } from "./serviceBase";

@Injectable({
    providedIn: 'root'
})

export class ProductCategoryService extends ServiceBase {


    productCategories$: Observable<productCategory[]> = this.httpClient.get<any>(this.APIUrl + '/productCategories')
    .pipe(
        map(categories => 
            categories.map(((product: productCategory) => ({
                ...product,
                searchProperty: product.name
              }) as productCategory))
    ));

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    // getProductCategoryList(): Observable<any[]> {
       
    //     // let categories1: productCategory[] = [
    //     //     { id: 1, name: "Fruits" },
    //     //     { id: 2, name: "Candies" },
    //     //     { id: 3, name: "Drinks" },
    //     // ];

    //     // return of(categories1);
    //       return this.httpClient.get<any>(this.APIUrl + '/productCategories');
    // }

    addProductCategory(val: any) {
        return this.httpClient.post(this.APIUrl + '/productCategories/', val);
    }

    updateProductCategory(valId: any, val: any) {
        return this.httpClient.put(this.APIUrl + '/productCategories/' + valId, val)
    }

    deleteProductCategory(val: any) {
        return this.httpClient.delete(this.APIUrl + '/productCategories/' + val);
    }
}