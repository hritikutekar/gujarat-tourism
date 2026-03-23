import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PlacesService } from '../../core/services/places.service';
import { TouristPlace } from '../../shared/models/tourist-place.model';
import { IconsModule } from '../../shared/icons.module';

@Component({
  selector: 'app-place-detail',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, IconsModule],
  templateUrl: './place-detail.component.html',
  styleUrl: './place-detail.component.scss',
})
export class PlaceDetailComponent implements OnInit {
  place: TouristPlace | null = null;
  loading = true;
  error = false;
  activeImageIndex = 0;

  constructor(private route: ActivatedRoute, private placesService: PlacesService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.placesService.getOne(id).subscribe({
      next: (place) => { this.place = place; this.loading = false; },
      error: () => { this.error = true; this.loading = false; },
    });
  }

  setActiveImage(index: number): void {
    this.activeImageIndex = index;
  }

  get activeImage(): string {
    return this.place?.images?.[this.activeImageIndex] || 'assets/placeholder.jpg';
  }

  prevImage(): void {
    if (this.place && this.activeImageIndex > 0) this.activeImageIndex--;
  }

  nextImage(): void {
    if (this.place && this.activeImageIndex < this.place.images.length - 1) this.activeImageIndex++;
  }
}
