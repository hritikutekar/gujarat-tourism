import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { customerAuthGuard } from './core/guards/customer-auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./customer/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'places',
    loadComponent: () => import('./customer/place-list/place-list.component').then(m => m.PlaceListComponent),
  },
  {
    path: 'places/:id',
    loadComponent: () => import('./customer/place-detail/place-detail.component').then(m => m.PlaceDetailComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./customer/login/login.component').then(m => m.CustomerLoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./customer/register/register.component').then(m => m.CustomerRegisterComponent),
  },
  {
    path: 'my-bookings',
    canActivate: [customerAuthGuard],
    loadComponent: () => import('./customer/my-bookings/my-bookings.component').then(m => m.MyBookingsComponent),
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./admin/shared/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'places',
        loadComponent: () => import('./admin/places/places.component').then(m => m.PlacesComponent),
      },
      {
        path: 'places/new',
        loadComponent: () => import('./admin/places/place-form/place-form.component').then(m => m.PlaceFormComponent),
      },
      {
        path: 'places/:id/edit',
        loadComponent: () => import('./admin/places/place-form/place-form.component').then(m => m.PlaceFormComponent),
      },
      {
        path: 'bookings',
        loadComponent: () => import('./admin/bookings/bookings.component').then(m => m.AdminBookingsComponent),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
