import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlacesService } from '../../../core/services/places.service';
import { PLACE_CATEGORIES } from '../../../shared/models/tourist-place.model';
import { forkJoin } from 'rxjs';
import { IconsModule } from '../../../shared/icons.module';

@Component({
  selector: 'app-place-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, IconsModule],
  templateUrl: './place-form.component.html',
  styleUrl: './place-form.component.scss',
})
export class PlaceFormComponent implements OnInit {
  form: FormGroup;
  categories = PLACE_CATEGORIES;
  isEdit = false;
  placeId: string | null = null;
  loading = false;
  saving = false;
  errorMessage = '';
  uploadedImageUrls: string[] = [];
  uploadingImages = false;

  constructor(
    private fb: FormBuilder,
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['Other', Validators.required],
      mapLink: [''],
      price: [null],
    });
  }

  ngOnInit(): void {
    this.placeId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.placeId;

    if (this.isEdit && this.placeId) {
      this.loading = true;
      this.placesService.getOne(this.placeId).subscribe({
        next: (place) => {
          this.form.patchValue({
            name: place.name,
            description: place.description,
            category: place.category,
            mapLink: place.mapLink ?? '',
            price: place.price ?? null,
          });
          this.uploadedImageUrls = [...place.images];
          this.loading = false;
        },
        error: () => { this.errorMessage = 'Failed to load place data.'; this.loading = false; },
      });
    }
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const files = Array.from(input.files);
    input.value = ''; // reset input so the same files can be re-selected if needed
    this.uploadingImages = true;
    this.errorMessage = '';

    const uploads = files.map((file) => this.placesService.uploadImage(file));
    forkJoin(uploads).subscribe({
      next: (results) => {
        this.uploadedImageUrls = [...this.uploadedImageUrls, ...results.map((r) => r.url)];
        this.uploadingImages = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Image upload failed. Make sure you are logged in.';
        this.uploadingImages = false;
      },
    });
  }

  removeImage(index: number): void {
    this.uploadedImageUrls.splice(index, 1);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, description, category, mapLink, price } = this.form.value;
    const payload = {
      name,
      description,
      category,
      mapLink: mapLink?.trim() ?? '',
      price: price !== '' && price !== null ? Number(price) : null,
      images: this.uploadedImageUrls,
    };

    this.saving = true;
    this.errorMessage = '';

    const request = this.isEdit && this.placeId
      ? this.placesService.update(this.placeId, payload)
      : this.placesService.create(payload);

    request.subscribe({
      next: () => this.router.navigate(['/admin/places']),
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to save place.';
        this.saving = false;
      },
    });
  }
}
