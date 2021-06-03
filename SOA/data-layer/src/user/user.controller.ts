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
  async findAll(@Query() reqParam) {
    return this.userService.findAll(reqParam);
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
}
