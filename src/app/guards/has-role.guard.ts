import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../core/user';
import { inject } from '@angular/core';

export const hasRoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router:Router = inject(Router);
  const token = sessionStorage.getItem('token');
  if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user: User = payload as User;
      if(user.role === 'Admin'){
        return true;
      }
      else{
        router.navigate(['/']);
      }
  }
  return false;
};
