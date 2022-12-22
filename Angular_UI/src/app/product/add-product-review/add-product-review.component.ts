import { Component, Input, OnInit } from '@angular/core';
import { ProductReviewService } from 'src/app/services/productReviewService';

@Component({
  selector: 'app-add-product-review',
  templateUrl: './add-product-review.component.html',
  styleUrls: ['./add-product-review.component.css']
})

export class AddProductReviewComponent implements OnInit {
 

  constructor(private productReviewService: ProductReviewService) { }

  @Input() productId: any;

  productReview: any = { 
    productId: 0,
    rating: 0,
    description: null
  };

  ngOnInit(): void {
  }

  saveProductReview() {
    this.productReview.productId = this.productId;
    this.productReviewService.addProductReview(this.productReview).subscribe( res => {

    });
  }

}
