export type Amenity =
  | 'wifi'
  | 'parking'
  | 'spa'
  | 'pool'
  | 'restaurant'
  | 'gym'
  | 'kids_club';

export interface RoomTypeSummary {
  id: string;
  name: string;
  occupancy: number;
  price: number;
  currency: string;
  refundable: boolean;
}

export interface HotelSummaryModel {
  id: string;
  name: string;
  city: string;
  country: string;
  stars: number;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  currency: string;
  amenities: Amenity[];
  heroImage?: string;
  roomTypes: RoomTypeSummary[];
}
