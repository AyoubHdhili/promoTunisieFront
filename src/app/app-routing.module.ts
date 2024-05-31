import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { StoreComponent } from './pages/store/store.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'signin', component:SigninComponent},
  {path:'store', component:StoreComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'product-detail', component: ProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
