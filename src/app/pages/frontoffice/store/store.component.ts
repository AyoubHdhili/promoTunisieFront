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
toggleSelection(category: string) {
  
  if (this.isSelected(category)) {
    this.selectedCategories = this.selectedCategories.filter(c => c !== category);
  } else {
    
    this.selectedCategories.push(category);
  }
  console.log(this.selectedCategories);
  this.productService.getProducts().subscribe((res) =>{
    if(this.selectedCategories.length === 0){
      this.products = res;
    }else{
    this.products = res.filter(product => this.selectedCategories.includes(product.category));
    }
  })


}
isSelected(category: string): boolean {
  return this.selectedCategories.includes(category);
}
filterMinPrice() {
  if(this.lowerPrice < 0 || this.lowerPrice === null){
    this.lowerPrice = 0;
  }
  this.productService.getProducts().subscribe((res) =>{
    this.products = res.filter(p => p.price >= this.lowerPrice);
  })
  
}
filterMaxPrice() {
  this.productService.getProducts().subscribe((res) =>{
    this.products = res.filter(p => p.price <= this.higherPrice);
  })
  
}
decrementLower() {
  if(this.lowerPrice > 0){
    this.lowerPrice--;
  }
}
incrementLower() {
this.lowerPrice++;
}

  products:Product[] = [];
  currentDate!: Date;
  categories: string[] = [];
  brands:string[] = [];
  lowerPrice:number = 0;
  higherPrice:number = 0;
  selectedCategories: string[] = [];

  constructor(private productService: ProductService, private cartService:CartService){}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.productService.getProducts().subscribe((res) =>{
      this.products = res;
      res.map(p=>{
        if(this.categories.includes(p.category) === false ){
          this.categories.push(p.category);
        }
        if(this.brands.includes(p.marque) === false ){
          this.brands.push(p.marque);
        }
      });
    })
  }

  getCount(category: string): number {
    return this.products.filter(p => p.category === category).length;
  }

  getCountBrand(brand: string): number {    
    return this.products.filter(p => p.marque === brand).length;
  }

  addToCart(id: string) {    
    this.cartService.addProductToCart(id);
    }

    isInCurrentWeek(dateStr: Date): boolean {
      let date = new Date(dateStr);
      let currentDate = new Date();
  
      let startOfWeek = new Date(currentDate);
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  
      let endOfWeek = new Date(currentDate);
      endOfWeek.setHours(23, 59, 59, 999);
      endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));
  
      return date >= startOfWeek && date <= endOfWeek;
    }

}
