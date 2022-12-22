import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BrowserBase } from 'src/app/browserBase';
import { PaginationService } from 'src/app/services/pagination.service';
import { AuthenticationService } from 'src/app/services/authenticationService';
import { OrderService } from 'src/app/services/orderService';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})

export class ShowOrdersComponent extends BrowserBase implements OnInit {

  sortedAndFilteredList$ = this.orderService.orders$;

  constructor(
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    protected paginationSerice: PaginationService,
    private router: Router) {
    
      super(paginationSerice);
  }

  @Input() userId: any;

  ngOnInit(): void {
    super.ngOnInit();
    this.refreshOrderList();
  }

  changeStatus(order: any, orderStatus: any) {
    order.status = orderStatus;

    this.orderService.updateOrder(order.id, order)
    .subscribe(
      res => {
        this.refreshOrderList();
      }
    );
  }

  getOrderDetails(order: any)
  {
    const queryParams: any = {};
    queryParams.orderId = order.id
   
    const navigationExtras: NavigationExtras = {
      queryParams
    };
    this.router.navigate(['/orderDetails/'], navigationExtras);
  }

  isAdmin(){
    return this.authenticationService.currentUser.role == "admin" ? true : false;
  }

  refreshOrderList() {
    if(this.isAdmin()){
      this.orderService.getAllOrderList().subscribe(data => {
        this.sortedAndFilteredList = data;
        this.listWithoutFilter = data;
      });
    }
    else{
      this.orderService.getOrderList(this.authenticationService.currentUser.id).subscribe(data => {
        this.sortedAndFilteredList = data;
        this.listWithoutFilter = data;
      });
    }
    
  }
}
