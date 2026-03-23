import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CustomerAuthService } from '../services/customer-auth.service';

export const customerAuthGuard: CanActivateFn = () => {
  const auth = inject(CustomerAuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login'], { queryParams: { redirect: 'my-bookings' } });
};
