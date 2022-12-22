import { HttpClient } from "@angular/common/http";
import { ServiceBase } from "./serviceBase";
import { Injectable } from '@angular/core';

// dependency injection enabled with this attribute
@Injectable({
    providedIn: 'root'
})

export class StatisticsService extends ServiceBase {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    getChartData(val: any) {
        return this.httpClient.get<any>(this.APIUrl + '/statistics/' + val);
    }
}

