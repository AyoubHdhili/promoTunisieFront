import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/product';
import { ProductService } from 'src/app/services/ProduitService/produit.service';
import { CartService } from 'src/app/services/cartservice/cart.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit{

  products:Product[] = [];

  constructor(private productService: ProductService, private cartService:CartService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) =>{
      this.products = res;
      
    })
  }

  addToCart(id: string) {
    console.log('here');
    
    this.cartService.addProductToCart(id);
    }

}
