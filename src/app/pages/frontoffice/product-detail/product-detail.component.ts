import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/product';
import { ProductService } from 'src/app/services/ProduitService/produit.service';
import { CartService } from 'src/app/services/cartservice/cart.service';

declare let $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterViewInit{
  id:string = '';
  product:Product = new Product();
  thumbimages: any[] = [];
  @ViewChild('quantity') quantityInput!: ElementRef;

  constructor(private ac:ActivatedRoute, private productService: ProductService, private cartService:CartService){}

  ngAfterViewInit(): void {
    
    // Product Main img Slick
    $('#product-main-img').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-imgs',
    });

    // Product imgs Slick
    $('#product-imgs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: '#product-main-img',
      responsive: [{
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        }
      },
      ]
    });

    // Product img zoom
    var zoomMainProduct = document.getElementById('product-main-img');
    if (zoomMainProduct) {
      $('#product-main-img .product-preview').zoom();
    }
  }

  ngOnInit(): void {
    this.ac.paramMap.subscribe((params) => {
      const param = params.get('id');
      if(param){
      this.productService.getProduct(param).subscribe((res) => {
        this.product = res;
        if(res.images !== null){
          this.thumbimages = res.images;
        }
        
      })
      }
    })
  }

  Increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.stock >= 1){
      value++;

      if (value > this.product.stock) {
        // @ts-ignore
        value = this.product.stock;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  Decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.stock > 0){
      value--;

      if (value <= 0) {
        // @ts-ignore
        value = 0;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }

  addToCart(id: string) {    
    this.cartService.addProductToCart(id,this.quantityInput.nativeElement.value);
    }

    ChangeQuantity(index: number, increase: boolean) {
      this.cartService.updateCartItems(index, increase)
      }

}
