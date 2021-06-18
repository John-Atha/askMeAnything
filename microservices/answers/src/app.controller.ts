import {
  Body,
  Controller,
  Get,
  Post
} from '@nestjs/common';
import { AppService } from './app.service';
import { ChoreoObjectDto } from './choreoObject.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('choreo')
  choreoHandle(@Body() body: ChoreoObjectDto ) {
    return this.appService.choreoHandle(body);
  }
}
