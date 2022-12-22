import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/imageService';
import { ProductReviewService } from 'src/app/services/productReviewService';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})

export class DetailsProductComponent implements OnInit {

  constructor (
    private imageService: ImageService,
    private productReviewService: ProductReviewService) { }

  @Input() product: any;

  detailName: string;
  detailPrice: number;
  detailSelectedProductCategory: any;
  detailImageName: string;
  detailImagePath: string;
  detailDescription: string;
  productReviewList: any[];

  ngOnInit(): void {

    this.detailName = this.product.name;
    this.detailPrice = this.product.price;
    this.detailSelectedProductCategory = this.product.selectedProductCategory;
    this.detailImageName = this.product.imageName;
    this.detailImagePath = this.imageService.PhotoUrl + this.detailImageName;
    this.detailDescription = this.product.description;
    this.refreshReviewList();
  }

  refreshReviewList() {
    this.productReviewService.getProductReviewList(this.product.id).subscribe(data => {
      this.productReviewList = data;
      console.log(this.productReviewList)
    });
  }
}
