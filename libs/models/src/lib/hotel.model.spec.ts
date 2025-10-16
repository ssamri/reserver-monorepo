import { HotelSummaryModel } from './hotel.model';

describe('HotelSummaryModel', () => {
  it('supports amenity list', () => {
    const hotel: HotelSummaryModel = {
      id: 'test',
      name: 'Test Hotel',
      city: 'Marrakech',
      country: 'Maroc',
      stars: 5,
      rating: 4.5,
      reviewCount: 120,
      priceFrom: 900,
      currency: 'MAD',
      amenities: ['wifi', 'spa'],
      roomTypes: []
    };
    expect(hotel.amenities).toContain('spa');
  });
});
