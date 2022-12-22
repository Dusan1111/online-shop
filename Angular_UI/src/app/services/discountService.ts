import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceBase } from "./serviceBase";

@Injectable({
    providedIn: 'root'
  })
  
export class DiscountService extends ServiceBase {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    getDiscountList(): Observable<any[]> {
        return this.httpClient.get<any>(this.APIUrl + '/discounts');
    }

    addDiscount(val: any) {
        return this.httpClient.post(this.APIUrl + '/discounts/', val);
    }

    updateDiscount(valId: any, val: any) {
        return this.httpClient.put(this.APIUrl + '/discounts/' + valId, val)
    }

    deleteDiscount(val: any) {
        return this.httpClient.delete(this.APIUrl + '/discounts/' + val);
    }
}