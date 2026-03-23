import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CustomerAuthService } from '../services/customer-auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const customerAuthService = inject(CustomerAuthService);

  // Use customer token for customer-facing API calls
  const isCustomerRoute =
    req.url.includes('/customer/auth') ||
    req.url.includes('/bookings/my') ||
    (req.url.includes('/bookings') && req.method === 'POST');

  const token = isCustomerRoute
    ? customerAuthService.getToken()
    : authService.getToken();

  if (token) {
    const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next(cloned);
  }
  return next(req);
};
