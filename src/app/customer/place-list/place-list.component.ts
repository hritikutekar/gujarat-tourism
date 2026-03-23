import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PlaceCardComponent } from '../../shared/components/place-card/place-card.component';
import { PlacesService } from '../../core/services/places.service';
import { TouristPlace, PLACE_CATEGORIES } from '../../shared/models/tourist-place.model';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { IconsModule } from '../../shared/icons.module';

@Component({
  selector: 'app-place-list',
  standalone: true,
  imports: [FormsModule, NavbarComponent, FooterComponent, PlaceCardComponent, IconsModule],
  templateUrl: './place-list.component.html',
  styleUrl: './place-list.component.scss',
})
export class PlaceListComponent implements OnInit {
  places: TouristPlace[] = [];
  loading = false;
  searchQuery = '';
  selectedCategory = '';
  categories = ['', ...PLACE_CATEGORIES];

  private searchSubject = new Subject<string>();

  constructor(
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['search'] || '';
      this.selectedCategory = params['category'] || '';
      this.fetchPlaces();
    });

    this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.updateQueryParams());
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
  }

  onCategoryChange(): void {
    this.updateQueryParams();
  }

  private updateQueryParams(): void {
    const queryParams: Record<string, string> = {};
    if (this.searchQuery.trim()) queryParams['search'] = this.searchQuery.trim();
    if (this.selectedCategory) queryParams['category'] = this.selectedCategory;
    this.router.navigate([], { queryParams, replaceUrl: true });
  }

  private fetchPlaces(): void {
    this.loading = true;
    this.placesService.getAll(this.searchQuery, this.selectedCategory).subscribe({
      next: (places) => { this.places = places; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }
}
