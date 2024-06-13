import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FrontofficeComponent } from 'src/app/pages/frontoffice/frontoffice.component';
import { HomeComponent } from 'src/app/pages/frontoffice/home/home.component';
import { CheckoutComponent } from 'src/app/pages/frontoffice/checkout/checkout.component';
import { ProductDetailComponent } from 'src/app/pages/frontoffice/product-detail/product-detail.component';
import { StoreComponent } from 'src/app/pages/frontoffice/store/store.component';
import { CartComponent } from 'src/app/pages/frontoffice/cart/cart.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    FrontofficeComponent,
    HomeComponent,
    CheckoutComponent,
    ProductDetailComponent,
    StoreComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    FrontofficeRoutingModule
  ]
})
export class FrontofficeModule { }
