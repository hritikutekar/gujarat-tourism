import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CustomerAuthService } from '../../core/services/customer-auth.service';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class CustomerLoginComponent {
  form: FormGroup;
  loading = false;
  errorMessage = '';
  private redirect = '/my-bookings';

  constructor(
    private fb: FormBuilder,
    private auth: CustomerAuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/my-bookings']);
    }
    this.redirect = this.route.snapshot.queryParams['redirect']
      ? `/${this.route.snapshot.queryParams['redirect']}`
      : '/my-bookings';

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.errorMessage = '';

    this.auth.login(this.form.value).subscribe({
      next: () => this.router.navigateByUrl(this.redirect),
      error: (err) => {
        this.errorMessage = err.error?.message || 'Invalid credentials';
        this.loading = false;
      },
    });
  }
}
