import { ISearchable } from "../interfaces/ISearchable";

export class productCategory implements ISearchable  {

    id: number;
    name: string;
    
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        
    }
    searchProperty: string;
}