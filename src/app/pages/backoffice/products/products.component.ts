import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/ProduitService/produit.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      data => this.products = data,
      error => console.error('Error fetching products', error)
    );
  }

  updateProduct(product: any): void {
    this.router.navigate(['/admin/dashboard/product'], { state: { product } });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(
      response => {
        console.log(response);
        this.loadProducts(); // Refresh the list
      },
      error => console.error('Error deleting product', error)
    );
  }
}
