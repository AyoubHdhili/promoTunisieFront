import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/product';
import { OrderService } from 'src/app/services/orderservice/order.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent {
  message: string = '';
  orderId: number = 0;
  products:ProductResponseModel[] = [];
  cartTotal: number = 0;

  constructor(
    private router: Router,
    private orderService: OrderService
  ){
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      message: string,
      products: ProductResponseModel[],
      orderId: number,
      total: number
    };

    this.message = state.message;
    this.orderId = state.orderId;
    this.products = state.products;
    this.cartTotal = state.total;
  }
}
interface ProductResponseModel {
  id: number;
  title: string;
  description: string;
  price: number;
  quantityOrdered: number;
  image: string;
}
