import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from 'src/app/pages/frontoffice/checkout/checkout.component';
import { FrontofficeComponent } from 'src/app/pages/frontoffice/frontoffice.component';
import { HomeComponent } from 'src/app/pages/frontoffice/home/home.component';
import { ProductDetailComponent } from 'src/app/pages/frontoffice/product-detail/product-detail.component';
import { StoreComponent } from 'src/app/pages/frontoffice/store/store.component';

const routes: Routes = [
  {path:'', component: FrontofficeComponent, children:[
    {path:'', component:HomeComponent},
    {path:'store', component:StoreComponent},
    {path:'checkout', component: CheckoutComponent},
    {path:'product-detail', component: ProductDetailComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
