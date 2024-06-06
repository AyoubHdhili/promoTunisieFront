import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from 'src/app/pages/backoffice/admin-dashboard/admin-dashboard.component';
import { ProductBackAddComponent } from 'src/app/pages/backoffice/product-back-add/product-back-add.component';
import { ProductsComponent } from 'src/app/pages/backoffice/products/products.component';

const routes: Routes = [
  {path:'dashboard', component:AdminDashboardComponent , children:[
    {path:'product', component:ProductBackAddComponent},
    {path:'productList', component:ProductsComponent},
    { path: '', redirectTo: 'productList', pathMatch: 'full' }, // Default route to productList

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
