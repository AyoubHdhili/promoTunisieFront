import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasRoleGuard } from 'src/app/guards/has-role.guard';
import { AdminDashboardComponent } from 'src/app/pages/backoffice/admin-dashboard/admin-dashboard.component';
import { LandingComponent } from 'src/app/pages/backoffice/landing/landing.component';
import { ProductBackAddComponent } from 'src/app/pages/backoffice/product-back-add/product-back-add.component';
import { ProductsComponent } from 'src/app/pages/backoffice/products/products.component';

const routes: Routes = [
  {path:'dashboard', component:AdminDashboardComponent ,
    canActivate: [hasRoleGuard],
    data: { expectedRole: 'Admin' },
     children:[
    {path:'home', component:LandingComponent},
    {path:'product', component:ProductBackAddComponent},
    {path:'productList', component:ProductsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
