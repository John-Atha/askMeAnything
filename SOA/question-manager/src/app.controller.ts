import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  description(@Query() reqParams: any): string {
    return this.appService.description(reqParams);
  }
}
