import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TouristPlace } from '../../shared/models/tourist-place.model';

@Injectable({ providedIn: 'root' })
export class PlacesService {
  private apiUrl = `${environment.apiUrl}/places`;

  constructor(private http: HttpClient) {}

  getAll(search?: string, category?: string): Observable<TouristPlace[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (category) params = params.set('category', category);
    return this.http.get<TouristPlace[]>(this.apiUrl, { params });
  }

  getOne(id: string): Observable<TouristPlace> {
    return this.http.get<TouristPlace>(`${this.apiUrl}/${id}`);
  }

  create(place: Partial<TouristPlace>): Observable<TouristPlace> {
    return this.http.post<TouristPlace>(this.apiUrl, place);
  }

  update(id: string, place: Partial<TouristPlace>): Observable<TouristPlace> {
    return this.http.put<TouristPlace>(`${this.apiUrl}/${id}`, place);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  uploadImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<{ url: string }>(`${environment.apiUrl}/upload`, formData);
  }
}
