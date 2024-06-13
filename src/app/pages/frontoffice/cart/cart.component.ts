import { Component, OnInit } from '@angular/core';
import { CartServer } from 'src/app/core/cart';
import { CartService } from 'src/app/services/cartservice/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  cartData: CartServer = new CartServer();
  cartTotal: number = 0;
  subTotal: number = 0;

  constructor(public cartService: CartService){}

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(cart => { 
      this.cartData.data = cart.data;
      
    });
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  ChangeQuantity(index: number, increase: boolean) {
    this.cartService.updateCartItems(index, increase)
    }

}
