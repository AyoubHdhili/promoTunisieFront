import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartServer } from 'src/app/core/cart';
import { CartService } from 'src/app/services/cartservice/cart.service';
import { OrderService } from 'src/app/services/orderservice/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{


  cartTotal: number = 0;
  cartData: CartServer = new CartServer();

  constructor(private cartService:CartService,
    private orderService:OrderService,
    private router: Router,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  oncheckout() {
    this.spinner.show().then(p =>{
      this.cartService.CheckoutFromCart();
    })
    }

}
