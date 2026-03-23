import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlacesService } from '../../core/services/places.service';
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
  loading = true;

  constructor(private placesService: PlacesService) {}

  ngOnInit(): void {
    this.placesService.getAll().subscribe({
      next: (places) => {
        this.totalPlaces = places.length;
        this.recentPlaces = places.slice(0, 5);
        this.categoryCounts = PLACE_CATEGORIES.map((cat) => ({
          name: cat,
          count: places.filter((p) => p.category === cat).length,
        })).filter((c) => c.count > 0);
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }
}
