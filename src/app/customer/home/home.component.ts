import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PlaceCardComponent } from '../../shared/components/place-card/place-card.component';
import { PlacesService } from '../../core/services/places.service';
import { TouristPlace } from '../../shared/models/tourist-place.model';
import { IconsModule } from '../../shared/icons.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink, NavbarComponent, FooterComponent, PlaceCardComponent, IconsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  featuredPlaces: TouristPlace[] = [];
  searchQuery = '';
  loading = true;
  categories = [
    { name: 'Beach', icon: '🏖️' },
    { name: 'Temple', icon: '🛕' },
    { name: 'Historical', icon: '🏰' },
    { name: 'Wildlife', icon: '🦁' },
    { name: 'Hill Station', icon: '⛰️' },
    { name: 'Other', icon: '📍' },
  ];

  constructor(private placesService: PlacesService, private router: Router) {}

  ngOnInit(): void {
    this.placesService.getAll().subscribe({
      next: (places) => {
        this.featuredPlaces = places.slice(0, 6);
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/places'], { queryParams: { search: this.searchQuery.trim() } });
    } else {
      this.router.navigate(['/places']);
    }
  }
}
