import { TouristPlace } from './tourist-place.model';
import { Customer } from './customer.model';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
  _id: string;
  customer: Customer | string;
  place: TouristPlace | string;
  travelDate: string;
  numberOfPeople: number;
  notes: string;
  status: BookingStatus;
  totalAmount: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingPayload {
  placeId: string;
  travelDate: string;
  numberOfPeople: number;
  notes?: string;
}
