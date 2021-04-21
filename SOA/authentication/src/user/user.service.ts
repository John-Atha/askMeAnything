import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(params): Promise<User[]> {
    let res = await this.manager.find(User);
    const start = parseInt(params.start) || 0;
    const end = parseInt(params.end)+1 || res.length;
    console.log(start);
    console.log(end);
    if (start > end) {
      throw new BadRequestException('Start parameter should be less than the end');
    }
    else {
      res = res.slice(start, end);
      //console.log(res);
      return res;
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await this.manager.findOne(User, id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found.`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
