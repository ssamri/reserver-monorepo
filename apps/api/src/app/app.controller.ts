import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({ path: 'health', version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  check() {
    return this.appService.health();
  }
}
