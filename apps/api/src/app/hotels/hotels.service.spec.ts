import { HotelsService } from './hotels.service';

describe('HotelsService', () => {
  const service = new HotelsService();

  it('should filter by destination', () => {
    const result = service.search({ destination: 'marrakech' });
    expect(result).toHaveLength(1);
    expect(result[0].city).toBe('Marrakech');
  });

  it('should filter by stars threshold', () => {
    const result = service.search({ stars: 5 });
    expect(result.every((hotel) => hotel.stars >= 5)).toBe(true);
  });
});
