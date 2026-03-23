import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PlacesService } from '../../core/services/places.service';
import { BookingService } from '../../core/services/booking.service';
import { CustomerAuthService } from '../../core/services/customer-auth.service';
import { TouristPlace } from '../../shared/models/tourist-place.model';
import { IconsModule } from '../../shared/icons.module';

@Component({
  selector: 'app-place-detail',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, IconsModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './place-detail.component.html',
  styleUrl: './place-detail.component.scss',
})
export class PlaceDetailComponent implements OnInit {
  place: TouristPlace | null = null;
  loading = true;
  error = false;
  activeImageIndex = 0;

  bookingForm: FormGroup;
  bookingLoading = false;
  bookingSuccess = false;
  bookingError = '';
  isCustomerLoggedIn = false;
  today = new Date().toISOString().split('T')[0];

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private bookingService: BookingService,
    private customerAuth: CustomerAuthService,
    private fb: FormBuilder,
  ) {
    this.bookingForm = this.fb.group({
      travelDate: ['', [Validators.required]],
      numberOfPeople: [1, [Validators.required, Validators.min(1), Validators.max(50)]],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.isCustomerLoggedIn = this.customerAuth.isLoggedIn();
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

  get estimatedTotal(): number | null {
    if (!this.place || this.place.price == null) return null;
    const people = this.bookingForm.get('numberOfPeople')?.value || 1;
    return this.place.price * people;
  }

  submitBooking(): void {
    if (this.bookingForm.invalid || !this.place) { this.bookingForm.markAllAsTouched(); return; }
    this.bookingLoading = true;
    this.bookingError = '';

    this.bookingService.create({
      placeId: this.place._id,
      travelDate: this.bookingForm.value.travelDate,
      numberOfPeople: this.bookingForm.value.numberOfPeople,
      notes: this.bookingForm.value.notes,
    }).subscribe({
      next: () => { this.bookingSuccess = true; this.bookingLoading = false; },
      error: (err) => {
        this.bookingError = err.error?.message || 'Booking failed. Please try again.';
        this.bookingLoading = false;
      },
    });
  }
}
