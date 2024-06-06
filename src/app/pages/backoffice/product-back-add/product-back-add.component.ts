import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/ProduitService/produit.service';

@Component({
  selector: 'app-product-back-add',
  templateUrl: './product-back-add.component.html',
  styleUrls: ['./product-back-add.component.scss']
})
export class ProductBackAddComponent implements OnInit {
  newProduct = {
    _id: '',  // Add this line
    name: '',
    price: 0,
    description: '',
    category: '',
    stock: 0,
    reviews: []
  };

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    const productToUpdate = history.state.product;
    if (productToUpdate) {
      // If product data is received, update the newProduct object
      this.newProduct = { ...productToUpdate };
    }
  }

  addProduct(): void {
    if (this.newProduct._id) {
      this.productService.updateProduct(this.newProduct._id, this.newProduct).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/admin/dashboard/productList']);
        },
        error => console.error('Error updating product', error)
      );
    } else {
      this.productService.addProduct(this.newProduct).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/admin/dashboard/productList']);
        },
        error => console.error('Error adding product', error)
      );
    }
  }
}
