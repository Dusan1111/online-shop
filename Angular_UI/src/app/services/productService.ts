import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "../models/product";
import { productCategory } from "../models/productCategory";
import { ServiceBase } from "./serviceBase";

@Injectable({
    providedIn: 'root'
  })
  
export class ProductService extends ServiceBase {

  
    products$: Observable<Product[]> = this.httpClient.get<any>(this.APIUrl + '/products').pipe(
        map(products => 
            products.map(((product: Product) => ({
                ...product,
                name: product.name,
                price: product.price,
                searchProperty: product.name
              }) as Product))
    ));

    
    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    addProduct(val: any) {
        return this.httpClient.post(this.APIUrl + '/products/', val);
    }

    updateProduct(valId: any, val: any) {
        return this.httpClient.put(this.APIUrl + '/products/' + valId, val)
    }

    deleteProduct(val: any) {
        return this.httpClient.delete(this.APIUrl + '/products/' + val);
    }

}