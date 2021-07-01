import { Controller, Request, Post, UseGuards, Get, Query } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService,
              private appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get()
  description(@Query() reqParams: any): any {
    return this.appService.description(reqParams);
  }
}
