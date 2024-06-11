import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router:Router = inject(Router);
  const protectedRoutes: string[] = ['/checkout'];
  return protectedRoutes.includes(state.url) && !sessionStorage.getItem('token')
  ? router.navigate(['/'])
  : true;
};
