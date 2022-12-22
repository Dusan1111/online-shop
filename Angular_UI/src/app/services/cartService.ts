
import { Injectable } from "@angular/core";
import { Cart } from "../models/cart";
import { ServiceBase } from "./serviceBase";

//TODO: create NgRx store for cart
@Injectable({
    providedIn: 'root'
  })
  
export class CartService extends ServiceBase {
    cart = new Cart();

}