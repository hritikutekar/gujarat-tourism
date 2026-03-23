import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { PlacesService } from '../../core/services/places.service';
import { TouristPlace } from '../../shared/models/tourist-place.model';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [RouterLink, SlicePipe],
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss',
})
export class PlacesComponent implements OnInit {
  places: TouristPlace[] = [];
  loading = true;
  deletingId: string | null = null;

  constructor(private placesService: PlacesService) {}

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.loading = true;
    this.placesService.getAll().subscribe({
      next: (places) => { this.places = places; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  confirmDelete(place: TouristPlace): void {
    if (!confirm(`Delete "${place.name}"? This action cannot be undone.`)) return;
    this.deletingId = place._id;
    this.placesService.delete(place._id).subscribe({
      next: () => {
        this.places = this.places.filter((p) => p._id !== place._id);
        this.deletingId = null;
      },
      error: () => { this.deletingId = null; alert('Failed to delete place.'); },
    });
  }

  getThumbnail(place: TouristPlace): string {
    return place.images?.[0] || 'assets/placeholder.jpg';
  }
}
