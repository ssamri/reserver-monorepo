export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface BookingModel {
  id: string;
  reference: string;
  userId: string;
  hotelId: string;
  roomTypeId: string;
  ratePlanId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  totalAmount: number;
  currency: string;
  status: BookingStatus;
  createdAt: string;
}
