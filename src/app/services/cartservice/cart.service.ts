import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductService } from '../ProduitService/produit.service';
import { OrderService } from '../orderservice/order.service';
import { CartPublic, CartServer } from 'src/app/core/cart';
import { Product } from 'src/app/core/product';
import { BehaviorSubject } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private endPoint = environment.baseUrl;

  private cartDataClient: CartPublic = {
    total: 0,
    prodData: [{
      incart: 0,
      id: ''
    }]
  }

  private cartDataServer: CartServer = {
    total: 0,
    data: [{
      numInCart: 0,
      product: undefined
    }]
  };

  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartServer>(this.cartDataServer);

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private toast:ToastrService ,
    private spinner:NgxSpinnerService
  ) {
    this.cartTotal$.next(this.cartDataServer.total);
    this.cartData$.next(this.cartDataServer);

    const cartLocalStorage = localStorage.getItem('cart');

    if (cartLocalStorage){
    let info:CartPublic = JSON.parse(cartLocalStorage);

    if(info != null && info != undefined && info.prodData[0].incart !== 0){
      this.cartDataClient = info;

      this.cartDataClient.prodData.forEach(p => {
        this.productService.getProduct(p.id).subscribe((actualProductInfo: Product) => {
          if(this.cartDataServer.data[0].numInCart === 0){
            this.cartDataServer.data[0].numInCart = p.incart;
            this.cartDataServer.data[0].product = actualProductInfo;
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }else {
            this.cartDataServer.data.push({
              numInCart: p.incart,
              product: actualProductInfo
            });
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartData$.next({... this.cartDataServer});
        });
      })
    }
  }
  }

  addProductToCart(id: string, quantity ?: number){
    console.log('here');
    
    this.productService.getProduct(id).subscribe(prod => {
      console.log(prod);
      
      if(this.cartDataServer.data[0].product === undefined){
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
        this.calculateTotal();
        this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0].id = prod._id;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartData$.next({... this.cartDataServer});
        this.toast.success(`${prod.name} added to the cart.`, "Product Added", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
      }else{
        let index = this.cartDataServer.data.findIndex(p=>p.product._id === prod._id);
        if(index !== -1){
          if(quantity !== undefined && quantity <= prod.stock){
            this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.stock ? quantity : prod.stock;
          } else{
            this.cartDataServer.data[index].numInCart < prod.stock ? this.cartDataServer.data[index].numInCart ++ : prod.stock;
          }
          this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
          this.calculateTotal();
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.toast.info(`${prod.name} quantity updated in the cart.`, "Product Updated", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        } else {
        this.cartDataServer.data.push({
          numInCart:1,
          product:prod
        });

        this.cartDataClient.prodData.push({
          incart:1,
          id:prod._id
        });
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.toast.success(`${prod.name} added to the cart.`, "Product Added", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })

        this.calculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartData$.next({... this.cartDataServer})
      }
    }
    });
  }

  updateCartItems(index : number, increase: boolean){
    let data = this.cartDataServer.data[index];

    if(increase){
      data.numInCart < data.product.stock ? data.numInCart++ : data.product.stock;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartData$.next({... this.cartDataServer})
    } else {
      data.numInCart --;
      if(data.numInCart < 1 ){
        this.cartData$.next({... this.cartDataServer});
      } else {
        this.cartData$.next({... this.cartDataServer});
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }

  deleteProductFromCart(index: number){
    if(window.confirm('are you sure you want to delete the product ??')){
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.calculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;

      if(this.cartDataClient.total === 0){
        this.cartDataClient = {
          total: 0,
          prodData: [{
            incart: 0,
            id: ''
          }]
        };
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
      if (this.cartDataServer.total === 0){
        this.cartDataServer = {
          total: 0,
          data: [{
            numInCart: 0,
            product: undefined
          }]
        };
        this.cartData$.next({... this.cartDataServer});
      } else {
        this.cartData$.next({... this.cartDataServer});
      }
    } else {
      return;
    }
  }

  private calculateTotal(){
    let Total = 0;
    this.cartDataServer.data.forEach(p => {
      const {numInCart} = p ;
      const {price} = p.product ;

      Total += numInCart*price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  /*CheckoutFromCart(userId: string){
    this.http.post(`${this.endPoint}orders/payment`, null).subscribe((res: {success: boolean}) => {
      if(res.success){
        this.resetServerData();
        this.http.post(`${this.endPoint}orders/new`,{
          userId: userId,
          products: this.cartDataClient.prodData
        }).subscribe((data: OrderResponse) => {
          this.orderService.getSingleOrder(data.order_id).then(prods => {
            if (data.success){
              const navigationExtras: NavigationExtras = {
                state : {
                  message: data.message,
                  products: prods,
                  orderId: data.order_id,
                  total: this.cartDataClient.total
                }
              };
              this.spinner.hide().then();
              this.router.navigate(['/thankyou'], navigationExtras)
            }
          })
        });
      } else{
        this.spinner.hide().then();
        this.router.navigateByUrl('/checkout').then();
        this.toast.error(`Sorry, failed to book the order`, "Order Status", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        }) 
      }

    })
  }*/

  private resetServerData(){
    this.cartDataServer = {
      total: 0,
      data: [{
        numInCart: 0,
        product: undefined
      }]
    };
    this.cartData$.next({... this.cartDataServer})
  }

}

interface OrderResponse {
  order_id: number;
  success: boolean;
  message: string;
  products: [{
    id: string,
    numInCart: string
  }]
}
