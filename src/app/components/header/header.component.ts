import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  email: string;
  username: string;
  role: string;
  id: string;
  paid: boolean;
  iat: number;
  exp: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit{

  token: boolean = false;
  username: string ='';

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<TokenPayload>(token);
      this.username = decodedToken.username;
      console.log(decodedToken.username);
      
      this.token = true;
    }
  }

  logout() {
      sessionStorage.clear();
      this.token = false;
    }


}
