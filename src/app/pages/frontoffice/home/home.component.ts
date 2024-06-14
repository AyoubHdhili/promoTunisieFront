import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/product';
import { ProductService } from 'src/app/services/ProduitService/produit.service';
import { CartService } from 'src/app/services/cartservice/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  products:Product[] = [];
  productsTop:Product[] = [];
  productsBottom:Product[] = [];
  token: boolean = false;
  categories:string[] = [];
  selectedCategoryTop:string = '';
  selectedCategoryBottom:string = '';

  constructor(private productService: ProductService, private cartService:CartService){}

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.token = true;
    }
    let top:Product[] = [];
    let bottom:Product[] =[];

    this.productService.getProducts().subscribe((res) =>{
      res.map(p=>{
        if(this.categories.includes(p.category) === false ){
          this.categories.push(p.category);
        }
      });
      this.selectedCategoryTop = this.categories[0];
      this.selectedCategoryBottom = this.categories[0];
      this.products = res;
      this.productsTop = res.filter(p => p.category === this.categories[0]);
      this.productsBottom = res.filter(p => p.category === this.categories[0]);
      for (let index = 0; index < 3; index++) {
        if(top.includes(this.productsTop[Math.floor(Math.random() * this.productsTop.length)]) === false){
        top.push(this.productsTop[Math.floor(Math.random() * this.productsTop.length)]); 
        }
        if(bottom.includes(this.productsBottom[Math.floor(Math.random() * this.productsBottom.length)]) === false){
        bottom.push(this.productsBottom[Math.floor(Math.random() * this.productsBottom.length)]);
        } 
      }
      this.productsTop = top;
      this.productsBottom = bottom;
      
    })
  }

  addToCart(id: string) {    
    this.cartService.addProductToCart(id);
    }
  
  setSelectedCategoryTop(category: string){
    this.selectedCategoryTop = category;
    let top:Product[] = [];
    this.productsTop = this.products.filter(p => p.category === this.selectedCategoryTop);
    for (let index = 0; index < 3; index++) {
      if(top.includes(this.productsTop[Math.floor(Math.random() * this.productsTop.length)]) === false){
        top.push(this.productsTop[Math.floor(Math.random() * this.productsTop.length)]); 
        }
    }    
    this.productsTop = top;
  }

  setSelectedCategoryBottom(category: string){
    this.selectedCategoryBottom = category;
    let bottom:Product[] = [];
    this.productsBottom = this.products.filter(p => p.category === this.selectedCategoryBottom);
    for (let index = 0; index < 3; index++) {
      if(bottom.includes(this.productsBottom[Math.floor(Math.random() * this.productsBottom.length)]) === false){
        bottom.push(this.productsBottom[Math.floor(Math.random() * this.productsBottom.length)]);
        } 
    }  
    this.productsBottom = bottom;
  }

}
