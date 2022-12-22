import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceBase } from "./serviceBase";

@Injectable({
    providedIn: 'root'
  })
  
export class ImageService extends ServiceBase {
    
    readonly PhotoUrl = "https://localhost:5001/Images/";

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    uploadImage(val: any) {
        return this.httpClient.post(this.APIUrl + '/products/SaveImage', val)
    }
}