import { ISearchable } from "../interfaces/ISearchable";

export class order implements ISearchable {

    id: number;
    total: number;
    address: string;
    customer: string;
    status: string;
    searchProperty: string;

    constructor(id: number, total: number, address: string, customer: string, status: string) {
        this.id = id;
        this.total = total;
        this.address = address;
        this.customer = customer;
        this.status = status;   
        this.searchProperty = id.toString();
    }

}