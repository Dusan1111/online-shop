import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceBase } from "./serviceBase";

@Injectable({
    providedIn: 'root'
  })
  
export class ProductReviewService extends ServiceBase {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    addProductReview(val: any) {
        return this.httpClient.post(this.APIUrl + '/productReview/', val)
    }

    getProductReviewList(val: any) {
        return this.httpClient.get<any>(this.APIUrl + '/productReview/' + val);
    }
}