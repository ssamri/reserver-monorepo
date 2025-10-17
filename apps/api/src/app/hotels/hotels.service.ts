import { Injectable } from '@nestjs/common';
import { SearchHotelsDto } from './dto/search-hotels.dto';
import { HotelSummary } from './entities/hotel-summary.entity';

const HOTELS: HotelSummary[] = [
  {
    id: 'riad-eden',
    name: 'Riad Eden Medina',
    city: 'Marrakech',
    stars: 4,
    priceFrom: 920,
    rating: 4.6
  },
  {
    id: 'casablanca-skyline',
    name: 'Skyline Business Hotel',
    city: 'Casablanca',
    stars: 5,
    priceFrom: 780,
    rating: 4.3
  },
  {
    id: 'agadir-sunset',
    name: 'Agadir Sunset Resort',
    city: 'Agadir',
    stars: 5,
    priceFrom: 1100,
    rating: 4.8
  }
];

@Injectable()
export class HotelsService {
  search(query: SearchHotelsDto): HotelSummary[] {
    const normalized = query.destination?.toLowerCase() ?? '';

    return HOTELS.filter((hotel) =>
      !normalized
        ? true
        : `${hotel.name} ${hotel.city}`.toLowerCase().includes(normalized)
    ).filter((hotel) => (query.stars ? hotel.stars >= query.stars : true));
  }
}
