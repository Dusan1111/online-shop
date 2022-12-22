import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

 // dependency injection enabled with this attribute
 @Injectable({
  providedIn: 'root'
})

export class ServiceBase {
   
    readonly APIUrl = "https://localhost:5001";

    constructor(protected httpClient: HttpClient) { }
  
}