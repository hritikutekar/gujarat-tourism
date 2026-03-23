import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking, CreateBookingPayload, BookingStatus } from '../../shared/models/booking.model';

export interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private base = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  // Customer
  create(payload: CreateBookingPayload): Observable<Booking> {
    return this.http.post<Booking>(this.base, payload);
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.base}/my`);
  }

  // Admin
  getAll(status?: BookingStatus): Observable<Booking[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<Booking[]>(this.base, { params });
  }

  updateStatus(id: string, status: BookingStatus): Observable<Booking> {
    return this.http.put<Booking>(`${this.base}/${id}/status`, { status });
  }

  getStats(): Observable<BookingStats> {
    return this.http.get<BookingStats>(`${this.base}/stats`);
  }
}
