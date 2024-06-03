import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from 'src/app/pages/backoffice/admin-dashboard/admin-dashboard.component';
import { ProductBackAddComponent } from 'src/app/pages/backoffice/product-back-add/product-back-add.component';

const routes: Routes = [
  {path:'dashboard', component:AdminDashboardComponent , children:[
    {path:'product', component:ProductBackAddComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
