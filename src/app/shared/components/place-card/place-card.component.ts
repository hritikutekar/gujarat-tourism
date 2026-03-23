import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { TouristPlace } from '../../models/tourist-place.model';
import { IconsModule } from '../../icons.module';

@Component({
  selector: 'app-place-card',
  standalone: true,
  imports: [RouterLink, SlicePipe, IconsModule],
  templateUrl: './place-card.component.html',
  styleUrl: './place-card.component.scss',
})
export class PlaceCardComponent {
  @Input({ required: true }) place!: TouristPlace;

  get thumbnail(): string {
    return this.place.images?.[0] || 'assets/placeholder.jpg';
  }
}
