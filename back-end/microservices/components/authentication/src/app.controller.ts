import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { ChoreoObjectDto } from './choreoObject.dto';

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
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('choreo')
  choreoHandle(@Body() body: ChoreoObjectDto ) {
    return this.appService.choreoHandle(body, true);
  }
}