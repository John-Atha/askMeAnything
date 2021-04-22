import {
  BadRequestException,
  Injectable,
  NotFoundException, UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    if (createUserDto.password === createUserDto.confirmation) {
      const allowed = await this.validRegister(createUserDto.username, createUserDto.email);
      if (allowed) {
        const user = await this.manager.create(User, createUserDto);
        return this.manager.save(user);
      }
      else {
        throw new BadRequestException(`Username/email already exist.`)
      }
    }
    else {
      throw new BadRequestException("Passwords don't match.");
    }
  }

  async findAll(params): Promise<User[]> {
    let res = await this.manager.find(User);
    const start = parseInt(params.start) - 1 || 0;
    const end =
      parseInt(params.end) || (parseInt(params.end) === 0 ? 0 : res.length);
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

  async update(id: number, updateUserDto: UpdateUserDto, req_user: User): Promise<User> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User ${id} not found.`);
      }
      else if (user.id!==req_user.id || user.username!==req_user.username) {
        throw new UnauthorizedException();
      }
      else {
        const valid = this.validUpdate(user.id, updateUserDto.username, updateUserDto.email)
        if (valid) {
          manager.merge(User, user, updateUserDto);
          return manager.save(user);
        }
        else {
          throw new BadRequestException(`Username/email already exist.`);
        }
      }
    });
  }

  async remove(id: number, req_user: User): Promise<void> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      console.log(user);
      console.log(req_user);
      if (!user) {
        throw new NotFoundException(`User ${id} not found.`);
      }
      else if (user.id!==req_user.id || user.username!==req_user.username) {
        throw new UnauthorizedException();
      }
      await manager.delete(User, id);
    });
  }

  async validRegister(username: string, email: string): Promise<boolean> {
    const res = await this.manager.find(User);
    let answer = true;
    res.forEach((user) => {
      if (user['username'] == username || user['email'] === email) {
        answer = false;
      }
    });
    return answer;
  }

  async validUpdate(id: number, username: string, email:string): Promise<boolean> {
    const res = await this.manager.find(User);
    let answer = true;
    res.forEach((user) => {
      if (user['id']!==id && (user['username']===username || user['email']===email)) {
        answer = false;
      }
    });
    return answer;
  }
}
