import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/frontoffice/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { StoreComponent } from './pages/frontoffice/store/store.component';
import { CheckoutComponent } from './pages/frontoffice/checkout/checkout.component';
import { ProductDetailComponent } from './pages/frontoffice/product-detail/product-detail.component';

const routes: Routes = [
  {path:'', loadChildren: ()=> import('../features/frontoffice/frontoffice.module').then(m=>m.FrontofficeModule)},
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path:'signin', component:SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
