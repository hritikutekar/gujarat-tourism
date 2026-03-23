import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PlacesService } from '../../core/services/places.service';
import { BookingService, BookingStats } from '../../core/services/booking.service';
import { TouristPlace, PLACE_CATEGORIES } from '../../shared/models/tourist-place.model';
import { IconsModule } from '../../shared/icons.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, IconsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  totalPlaces = 0;
  categoryCounts: { name: string; count: number }[] = [];
  recentPlaces: TouristPlace[] = [];
  bookingStats: BookingStats = { total: 0, pending: 0, confirmed: 0, cancelled: 0 };
  loading = true;

  constructor(
    private placesService: PlacesService,
    private bookingService: BookingService,
  ) {}

  ngOnInit(): void {
    forkJoin({
      places: this.placesService.getAll(),
      bookings: this.bookingService.getStats(),
    }).subscribe({
      next: ({ places, bookings }) => {
        this.totalPlaces = places.length;
        this.recentPlaces = places.slice(0, 5);
        this.categoryCounts = PLACE_CATEGORIES.map((cat) => ({
          name: cat,
          count: places.filter((p) => p.category === cat).length,
        })).filter((c) => c.count > 0);
        this.bookingStats = bookings;
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }
}
