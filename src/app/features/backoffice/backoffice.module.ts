import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { HeaderBackComponent } from 'src/app/pages/backoffice/header-back/header-back.component';
import { AdminDashboardComponent } from 'src/app/pages/backoffice/admin-dashboard/admin-dashboard.component';
import { SidebarBackComponent } from 'src/app/pages/backoffice/sidebar-back/sidebar-back.component';
import { ProductBackAddComponent } from 'src/app/pages/backoffice/product-back-add/product-back-add.component';
import { ProductsComponent } from 'src/app/pages/backoffice/products/products.component';
import { FormsModule } from '@angular/forms'; // Ajoutez cette ligne
import { ProductService } from 'src/app/services/ProduitService/produit.service';
import { BrowserModule } from '@angular/platform-browser';
import { LandingComponent } from 'src/app/pages/backoffice/landing/landing.component';



@NgModule({
  declarations: [
    HeaderBackComponent,
    AdminDashboardComponent,
    SidebarBackComponent,
    ProductBackAddComponent,
    ProductsComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    FormsModule // Ajoutez cette ligne

  ],
  providers: [ProductService],

})
export class BackofficeModule { }
