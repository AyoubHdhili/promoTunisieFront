import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/frontoffice/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { StoreComponent } from './pages/frontoffice/store/store.component';
import { CheckoutComponent } from './pages/frontoffice/checkout/checkout.component';
import { ProductDetailComponent } from './pages/frontoffice/product-detail/product-detail.component';
import { SignupComponent } from './pages/signup/signup.component';
import { hasRoleGuard } from './guards/has-role.guard';

const routes: Routes = [
  {path:'', loadChildren: ()=> import('./features/frontoffice/frontoffice.module').then(m=>m.FrontofficeModule)},
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path:'admin', loadChildren: ()=> import('./features/backoffice/backoffice.module').then(m=>m.BackofficeModule)},
  {path:'signin', component:SigninComponent},
  {path:'signup', component:SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
