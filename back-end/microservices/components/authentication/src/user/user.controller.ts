import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor
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
  async findAll(@Query() reqParam: any) {
    return this.userService.findAll(reqParam);
  }

  @Get('ranking')
  findUsersRanking(@Request() req, @Query() reqParams) {
    return this.userService.ranking(req, reqParams);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Request() req, @Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto, req);
  }

  @Patch(':id/points/incr')
  pointsIncr(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.userService.pointsUpd(req, id, 'incr');
  }

  @Patch(':id/points/decr')
  pointsDecr(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.userService.pointsUpd(req, id, 'decr');
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id, req);
  }

  //@UseGuards(JwtAuthGuard)
  @Post('logged')
  identify(@Request() req) {
    return this.userService.identify(req);
  }
}
