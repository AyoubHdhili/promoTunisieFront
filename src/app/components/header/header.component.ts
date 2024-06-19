import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CartServer } from 'src/app/core/cart';
import { CartService } from 'src/app/services/cartservice/cart.service';

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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit{

  token: boolean = false;
  username: string ='';
  cartData: CartServer = new CartServer();
  cartTotal: number = 0;

  constructor(public cartService: CartService){}

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<TokenPayload>(token);
      this.username = decodedToken.username;      
      this.token = true;
    }

    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartData$.subscribe(data => this.cartData = data)
  }

  logout() {
      sessionStorage.clear();
      localStorage.clear();
      this.token = false;
    }


}
