import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/ProduitService/produit.service';

@Component({
  selector: 'app-frontoffice',
  templateUrl: './frontoffice.component.html',
  styleUrls: ['./frontoffice.component.scss']
})
export class FrontofficeComponent implements OnInit{
  categories: string[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => {
      res.map(p=>{
        if(this.categories.includes(p.category) === false ){
          this.categories.push(p.category);
        }
      });
    })
  }


}
