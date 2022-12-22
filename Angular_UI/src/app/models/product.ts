import { ISearchable } from "../interfaces/ISearchable";
import { productCategory } from "./productCategory";

export class Product implements ISearchable {

    id: number;
    name: string;
    price: number;
    rating: number;
    productCategoryId: number;
    productCategory: productCategory;
    discountedPrice: number;
    ammount: number;
    description: string;
    imageName: string;

    searchProperty: string;

    constructor(id: number, name: string, price: number, 
        rating: number, productCategoryId: number, productCategory: productCategory,
        discountedPrice: number, ammount: number, description: string, imageName: string) {
    // constructor(id: number, name: string, price: number, rating: number, category: string, imageName: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.productCategoryId = productCategoryId;
        this.productCategory = productCategory;
        this.discountedPrice = discountedPrice;
        this.ammount = ammount;
        this.description = description;
        this.imageName = imageName;
        // this.category = category;
    }
}

// export function doesProductPriceBelongToPriceRange (fromPrice: number, toPrice: number) {
//     return ((toPrice == 0) || (this.price >= fromPrice && this.price <= toPrice));
//   }