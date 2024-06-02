import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  token: boolean = false;

  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.token = true;
    }
  }

  logout() {
      sessionStorage.clear();
      this.token = false;
    }


}
