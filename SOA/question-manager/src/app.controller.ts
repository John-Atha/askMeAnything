import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  needsAuth(@Query() reqParams: any): string {
    return this.appService.needsAuth(reqParams);
  }
}
