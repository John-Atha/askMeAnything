import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { paginate } from 'general_methods/methods';

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
      const user = await this.manager.create(User, createUserDto);
      const hash = bcrypt.hashSync(user.password, saltRounds);
      user.password = hash;
      return this.manager.save(user);
  }

  async findAll(params): Promise<User[]> {
    const res = await this.manager.find(User);
    return paginate(res, params);
  }

  async findOne(conditions: any): Promise<User> {
    let user = null;
    let { id, username, email } = conditions;
    console.log(conditions);
    if (id) user = await this.manager.findOne(User, id);
    else if (username) user = await this.manager.findOne(User, { username });
    else if (email) user = await this.manager.findOne(User, { email });
    /*if (!user) {
      throw new NotFoundException(`User not found.`);
    }*/
    return user;
  }

  async findOneWithPass(conditions: any): Promise<User> {
    let user = null;
    let { id, username, email } = conditions;
    console.log(conditions);
    if (id) user = await this.manager.findOne(User, id);
    else if (username) user = await this.manager.findOne(User, { username });
    else if (email) user = await this.manager.findOne(User, { email });
    /*if (!user) {
      throw new NotFoundException(`User not found.`);
    }*/
    user['pass'] = user['password'];
    return user;
  }
  
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      const newUser = await manager.merge(User, user, updateUserDto);
      return manager.save(newUser);
    });
  }

  async remove(id: number): Promise<void> {
    return this.manager.transaction(async (manager) => {
      await manager.delete(User, id);
    });
  }
}
