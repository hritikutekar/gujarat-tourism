import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomerLogin, CustomerRegister, CustomerAuthResponse } from '../../shared/models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerAuthService {
  private readonly TOKEN_KEY = 'gt_customer_token';
  private readonly NAME_KEY = 'gt_customer_name';
  private readonly EMAIL_KEY = 'gt_customer_email';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  register(payload: CustomerRegister): Observable<CustomerAuthResponse> {
    return this.http
      .post<CustomerAuthResponse>(`${environment.apiUrl}/customer/auth/register`, payload)
      .pipe(tap((res) => this.saveSession(res)));
  }

  login(credentials: CustomerLogin): Observable<CustomerAuthResponse> {
    return this.http
      .post<CustomerAuthResponse>(`${environment.apiUrl}/customer/auth/login`, credentials)
      .pipe(tap((res) => this.saveSession(res)));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.EMAIL_KEY);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getName(): string | null {
    return localStorage.getItem(this.NAME_KEY);
  }

  getEmail(): string | null {
    return localStorage.getItem(this.EMAIL_KEY);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private saveSession(res: CustomerAuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, res.token);
    localStorage.setItem(this.NAME_KEY, res.name);
    localStorage.setItem(this.EMAIL_KEY, res.email);
    this.isLoggedInSubject.next(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
