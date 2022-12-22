import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/imageService';
import { OrderService } from 'src/app/services/orderService';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css']
})

export class DetailsOrderComponent implements OnInit {

  orderId: any;
  order: any;

  constructor(
    private orderService: OrderService,
    private imageService: ImageService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
      this.orderService.getOrder(this.orderId).subscribe(data => {
        this.order = data;
      });
    });
  }

  getImagePath(imageName: any){
    return this.imageService.PhotoUrl + imageName;
  }
}
