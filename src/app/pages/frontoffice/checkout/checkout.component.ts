import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartServer } from 'src/app/core/cart';
import { Commande } from 'src/app/core/commande';
import { CartService } from 'src/app/services/cartservice/cart.service';
import { OrderService } from 'src/app/services/orderservice/order.service';

interface TokenPayload {
  email: string;
  username: string;
  role: string;
  id: string;
  iat: number;
  exp: number;
  address: string;
  phone: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{


  cartTotal: number = 0;
  cartData: CartServer = new CartServer();
  commande: Commande = new Commande();

  constructor(private cartService:CartService,
    private orderService:OrderService,
    private router: Router,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<TokenPayload>(token);
      console.log(decodedToken);
      
      this.commande.nom = decodedToken.username.split(' ')[0];
      this.commande.prenom = decodedToken.username.split(' ')[1];
      this.commande.Email = decodedToken.email;
      this.commande.address = decodedToken.address;
      this.commande.telephone = decodedToken.phone;
    }
  }

  oncheckout() {
    this.spinner.show().then(p =>{
      this.cartService.CheckoutFromCart();
    })
    }

}
