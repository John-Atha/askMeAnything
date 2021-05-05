import {
  Controller,
  Get,
  Param,
  ClassSerializerInterceptor,
  Query,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/questions/monthly/:year/:month')
  findUsersQuestionsMonthly(
    @Query() reqParams,
    @Param('id', ParseIntPipe) id: number,
    @Param('year', ParseIntPipe) year:number,
    @Param('month', ParseIntPipe) month: number,
  ) {
    return this.userService.findQuestionsMonthly(reqParams, id, year, month);
  }

  @Get(':id/answers/monthly/:year/:month')
  findUsersAnswersMonthly(
    @Query() reqParams,
    @Param('id', ParseIntPipe) id: number,
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number,
  ) {
    return this.userService.findAnswersMonthly(reqParams, id, year, month);
  }
}
