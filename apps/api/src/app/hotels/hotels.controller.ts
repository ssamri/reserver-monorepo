import { Controller, Get, Query } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { SearchHotelsDto } from './dto/search-hotels.dto';

@Controller({ path: 'hotels', version: '1' })
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  search(@Query() query: SearchHotelsDto) {
    return this.hotelsService.search(query);
  }
}
