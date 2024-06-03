import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { HeaderBackComponent } from 'src/app/pages/backoffice/header-back/header-back.component';
import { AdminDashboardComponent } from 'src/app/pages/backoffice/admin-dashboard/admin-dashboard.component';
import { SidebarBackComponent } from 'src/app/pages/backoffice/sidebar-back/sidebar-back.component';
import { ProductBackAddComponent } from 'src/app/pages/backoffice/product-back-add/product-back-add.component';



@NgModule({
  declarations: [
    HeaderBackComponent,
    AdminDashboardComponent,
    SidebarBackComponent,
    ProductBackAddComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule
  ]
})
export class BackofficeModule { }
