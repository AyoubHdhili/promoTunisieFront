import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartServer } from 'src/app/core/cart';
import { Commande } from 'src/app/core/commande';
import { facture } from 'src/app/core/facture';
import { ProductService } from 'src/app/services/ProduitService/produit.service';
import { CartService } from 'src/app/services/cartservice/cart.service';
import { OrderService } from 'src/app/services/orderservice/order.service';

interface TokenPayload {
  email: string;
  username: string;
  role: string;
  id: string;
  iat: number;
  exp: number;
  address: string;
  phone: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{


  cartTotal: number = 0;
  cartData: CartServer = new CartServer();
  commande: Commande = new Commande();
  facture: facture = new facture();


  constructor(private cartService:CartService,
    private productService: ProductService,
    private orderService:OrderService,
    private router: Router,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<TokenPayload>(token);
      console.log(decodedToken);
      
      this.commande.nom = decodedToken.username.split(' ')[0];
      this.commande.prenom = decodedToken.username.split(' ')[1];
      this.commande.Email = decodedToken.email;
      this.commande.address = decodedToken.address;
      this.commande.telephone = decodedToken.phone;
    }
  }

  
  oncheckout() {
    const TVA = Number(this.cartData.total)*0.19;
    const TTC = Number(this.cartData.total) + TVA;
    const products: { quantity: number; product: any; price: any; }[] = [];
    this.cartData.data.map((p) => {
      products.push({ quantity: p.numInCart, product: p.product.name, price: p.product.price })
    })
    const invoiceData = {
      invoiceNumber: 'Facture',
      firstName: this.commande.prenom,
      lastName: this.commande.nom,
      address: this.commande.address,
      zipCode: this.commande.zipCode,
      city: this.commande.ville,
      governorat: this.commande.governorat,
      items: products,
      totalHT: this.cartData.total,
      TVA: TVA,
      totalTTC: TTC
    };

    this.productService.downloadInvoice(invoiceData).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'facture.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url); // Clean up the URL object
    }, error => {
      console.error('Download error:', error);
    });
  }

  downloadFile(filename: string) {
    this.productService.downloadFile(filename).subscribe(
        (blob: Blob) => {
            // Create a URL for the blob and trigger a download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        error => {
            console.error('Error downloading file', error);
            // Handle error as needed
        }
    );
}

}
