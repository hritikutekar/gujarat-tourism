import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { BookingService } from '../../core/services/booking.service';
import { Booking, BookingStatus } from '../../shared/models/booking.model';
import { TouristPlace } from '../../shared/models/tourist-place.model';
import { environment } from '../../../environments/environment';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [RouterLink, DatePipe, CurrencyPipe, TitleCasePipe, NavbarComponent, FooterComponent],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss',
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;
  apiBase = environment.apiUrl.replace('/api', '');

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getMyBookings().subscribe({
      next: (data) => { this.bookings = data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  getPlace(booking: Booking): TouristPlace {
    return booking.place as TouristPlace;
  }

  getStatusClass(status: BookingStatus): string {
    return { pending: 'status-pending', confirmed: 'status-confirmed', cancelled: 'status-cancelled' }[status];
  }

  getImageUrl(path: string | undefined): string {
    if (!path) return 'assets/placeholder.jpg';
    return path.startsWith('http') ? path : `${this.apiBase}${path}`;
  }
}
