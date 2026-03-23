export type PlaceCategory = 'Beach' | 'Temple' | 'Historical' | 'Wildlife' | 'Hill Station' | 'Other';

export const PLACE_CATEGORIES: PlaceCategory[] = [
  'Beach', 'Temple', 'Historical', 'Wildlife', 'Hill Station', 'Other'
];

export interface TouristPlace {
  _id: string;
  name: string;
  description: string;
  images: string[];
  mapLink?: string;
  category: PlaceCategory;
  createdAt: string;
  updatedAt: string;
}
