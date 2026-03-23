import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { BookingService } from '../../core/services/booking.service';
import { Booking, BookingStatus } from '../../shared/models/booking.model';
import { TouristPlace } from '../../shared/models/tourist-place.model';
import { Customer } from '../../shared/models/customer.model';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, TitleCasePipe],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class AdminBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;
  activeFilter: BookingStatus | 'all' = 'all';
  updatingId: string | null = null;
  readonly filters: (BookingStatus | 'all')[] = ['all', 'pending', 'confirmed', 'cancelled'];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    const status = this.activeFilter === 'all' ? undefined : this.activeFilter;
    this.bookingService.getAll(status).subscribe({
      next: (data) => { this.bookings = data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  setFilter(filter: BookingStatus | 'all'): void {
    this.activeFilter = filter;
    this.loadBookings();
  }

  updateStatus(booking: Booking, status: BookingStatus): void {
    this.updatingId = booking._id;
    this.bookingService.updateStatus(booking._id, status).subscribe({
      next: (updated) => {
        const idx = this.bookings.findIndex(b => b._id === updated._id);
        if (idx !== -1) this.bookings[idx] = updated;
        this.updatingId = null;
      },
      error: () => { this.updatingId = null; },
    });
  }

  getPlace(booking: Booking): TouristPlace {
    return booking.place as TouristPlace;
  }

  getCustomer(booking: Booking): Customer {
    return booking.customer as Customer;
  }

  getStatusClass(status: BookingStatus): string {
    return { pending: 'status-pending', confirmed: 'status-confirmed', cancelled: 'status-cancelled' }[status];
  }
}
