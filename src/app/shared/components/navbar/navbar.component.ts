import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomerAuthService } from '../../../core/services/customer-auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isCustomerLoggedIn = false;
  customerName = '';

  constructor(private customerAuth: CustomerAuthService) {}

  ngOnInit(): void {
    this.customerAuth.isLoggedIn$.subscribe((loggedIn) => {
      this.isCustomerLoggedIn = loggedIn;
      this.customerName = this.customerAuth.getName() ?? '';
    });
  }

  logout(): void {
    this.customerAuth.logout();
  }
}
