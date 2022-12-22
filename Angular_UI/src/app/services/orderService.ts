import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { order } from "../models/order";
import { ServiceBase } from "./serviceBase";

@Injectable({
    providedIn: 'root'
  })

export class OrderService extends ServiceBase {

    orderList: order [] = [
        {id:1, address:"Cara Lazara 139", total: 4400, customer: "Dusan Pantic", status:"Pending", searchProperty: "1"},
        {id:2, address:"Cara Lazara 149", total: 2110, customer: "Dusan Pantic", status:"Pending", searchProperty: "2"},
        {id:3, address:"Cara Lazara 119", total: 3210, customer: "Dusan Pantic", status:"Pending", searchProperty: "3"},
        {id:4, address:"Cara Lazara 1679", total: 440, customer: "Dusan Pantic", status:"Pending", searchProperty: "4"},
        {id:5, address:"Cara Lazara 139", total: 880, customer: "Dusan Pantic", status:"Pending", searchProperty: "5"},
    ];
    
    orders$: Observable<order[]> = of(this.orderList);

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    getOrderList(val: any): Observable<any[]> {
        return this.httpClient.get<any>(this.APIUrl + '/order/' + val);
    }

    getAllOrderList(): Observable<any[]> {
        return this.httpClient.get<any>(this.APIUrl + '/order/');
    }

    addOrder(val: any) {
        return this.httpClient.post(this.APIUrl + '/order/', val);
    }

    updateOrder(valId: any, val: any) {
        return this.httpClient.put(this.APIUrl + '/order/' + valId, val)
    }

    getOrder(valId: any) {
        return this.httpClient.get(this.APIUrl + '/order/' + valId)
    }

}