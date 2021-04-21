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
    const start = parseInt(params.start) - 1 || 0;
    const end = parseInt(params.end) ||  ( parseInt(params.end)===0 ? 0 : res.length );
    console.log(`params:`);
    console.log(params);
    console.log(`start: ${start}`);
    console.log(`end: ${end}`);
    if (start > end || start <= -1 || end === 0) {
      throw new BadRequestException('Invalid parameters');
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User ${id} not found.`);
      }
      manager.merge(User, user, updateUserDto);
      return manager.save(user);
    });
  }

  async remove(id: number): Promise<void> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User ${id} not found.`);
      }
      await manager.delete(User, id);
    });
  }
}
