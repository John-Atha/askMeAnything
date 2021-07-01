import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('one')
  findOne(@Query() conditions: any) {
    return this.userService.findOne(conditions);
  }

  @Get('one/pass')
  findOneWithPass(@Query() conditions: any) {
    return this.userService.findOneWithPass(conditions);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Get(':id/answered')
  findAnswered(@Param('id', ParseIntPipe) id: number, @Query() reqParams: any) {
    return this.userService.findAnswered(id, reqParams);
  }

  @Get(':id/questions/stats/monthly')
  findUsersQuestionsStatsMonthly(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findQuestionsStatsMonthly(id);
  }

  @Get(':id/answers/stats/monthly')
  findUsersAnswersStatsMonthly(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findAnswersStatsMonthly(id);
  }

  @Get(':id/questions/stats/daily')
  findUsersQuestionsStatsDaily(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findQuestionsStatsDaily(id);
  }

  @Get(':id/answers/stats/daily')
  findUsersAnswersStatsDaily(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findAnswersStatsDaily(id);
  }

  @Get('ranking')
  findUsersRanking(@Request() req, @Query() reqParams) {
    return this.userService.ranking();
  }

  @Get(':id/answered/stats/monthly')
  findUsersAnsweredStatsMonthly(@Param ('id', ParseIntPipe) id: number) {
    return this.userService.findAnsweredStatsMonthly(id);
  }

  @Get(':id/answered/stats/daily')
  findUsersAnsweredStatsDaily(@Param ('id', ParseIntPipe) id: number) {
    return this.userService.findAnsweredStatsDaily(id);
  }
}
