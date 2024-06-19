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
  currentDate!: Date;
  categories: string[] = [];

  constructor(private productService: ProductService, private cartService:CartService){}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.productService.getProducts().subscribe((res) =>{
      this.products = res;
      res.map(p=>{
        if(this.categories.includes(p.category) === false ){
          this.categories.push(p.category);
        }
      });
    })
  }

  getCount(category: string): number {
    return this.products.filter(p => p.category === category).length;
  }

  addToCart(id: string) {    
    this.cartService.addProductToCart(id);
    }

}
