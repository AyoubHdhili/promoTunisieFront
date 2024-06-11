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
    _id: '',
    name: '',
    price: 0,
    description: '',
    category: '',
    stock: 0,
    reviews: []
  };

  selectedFiles: File[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    const productToUpdate = history.state.product;
    if (productToUpdate) {
      // If product data is received, update the newProduct object
      this.newProduct = { ...productToUpdate };
    }
  }

  onFilesChange(event: any): void {
    this.selectedFiles = event.target.files;
  }

  addProduct(): void {
    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('price', this.newProduct.price.toString());
    formData.append('description', this.newProduct.description);
    formData.append('category', this.newProduct.category);
    formData.append('stock', this.newProduct.stock.toString());

    Array.from(this.selectedFiles).forEach((file, index) => {
      formData.append('images', file, file.name);
    });

    if (this.newProduct._id) {
      this.productService.updateProduct(this.newProduct._id, formData).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/admin/dashboard/productList']);
        },
        error => console.error('Error updating product', error)
      );
    } else {
      this.productService.addProduct(formData).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/admin/dashboard/productList']);
        },
        error => console.error('Error adding product', error)
      );
    }
  }
}
