import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { createUser, deleteUser, getAllUsers, getOneUser, updateUser } from '../async_calls/async_calls';
import { paginate, verify } from '../../general_methods/methods';
import { jwtConstants } from '../../constants';
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    if (createUserDto.password === createUserDto.confirmation) {
      const allowed = await this.validRegister(createUserDto.username, createUserDto.email);
      if (allowed) {
        const user = await createUser(createUserDto);
        return user.data;
      }
      else {
        throw new BadRequestException(`Username/email already exist.`)
      }
    }
    else {
      throw new BadRequestException("Passwords don't match.");
    }
  }

  async findAll(params): Promise<any> {
    const res = await getAllUsers();
    return paginate(res.data, params);
    //const res = await getAllUsers();
    //console.log(res);
    //return this.paginate(res, params);
  }

  async findOne(id: number): Promise<any> {
    //const user = await this.manager.findOne(User, id);
    const user = await getOneUser({ id });
    console.log(`user: ${user.data}`);
    if (!user.data) {
      throw new NotFoundException(`User '${id}' not found.`);
    }
    return user.data;
  }

  async update(id: number, updateUserDto: UpdateUserDto, req: any): Promise<any> {
    return this.manager.transaction(async (manager) => {
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      const req_user_id = verify(req);
      if (!user) {
        throw new NotFoundException(`User ${id} not found.`);
      }
      else if (user.data.id!==req_user_id) {
        throw new UnauthorizedException();
      }
      else {
        const valid = await this.validUpdate(user.data.id, updateUserDto.username, updateUserDto.email)
        if (valid) {
          const newUser = await updateUser(user.data.id, updateUserDto);
          return newUser.data;
        }
        else {
          throw new BadRequestException(`Username/email already exist.`);
        }
      }
    });
  }

  async remove(id: number, req: any): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const req_user_id = verify(req);
      //const user = await manager.findOne(User, id);
      const user = await getOneUser({ id });
      if (!user.data) {
        throw new NotFoundException(`User ${id} not found.`);
      }
      else if (id!==req_user_id /* || user.data.username!==req_user.username*/) {
        throw new UnauthorizedException();
      }
      return deleteUser(id);
    });
  }

  async validRegister(username: string, email: string): Promise<boolean> {
    //const res1 = await this.manager.findOne(User, { username: username });
    const res1 = await getOneUser({ username });
    //const res2 = await this.manager.findOne(User, { email: email });
    const res2 = await getOneUser({ email });
    return !res1.data && !res2.data;
  }

  async validUpdate(id: number, username: string, email:string): Promise<boolean> {
    //const res1 = await this.manager.findOne(User, { username: username });
    const res1 = await getOneUser({ username });
    //const res2 = await this.manager.findOne(User, { email: email });
    const res2 = await getOneUser({ email });
    return (
      (!res1.data || (res1.data && res1.data['id'] === id)) &&
      (!res2.data || (res2.data && res2.data['id'] === id))
    );
  }

  identify(req: any) {
    const headers = req['rawHeaders'];
    let token = '';
    headers.forEach((header) => {
      if (header.startsWith('Bearer')) {
        token = header.slice(7);
      }
    });
    let decoded = {};
    try {
      decoded = jwt.verify(token, jwtConstants.secret);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return { 
      username: decoded['username'],
      id: decoded['sub'],
    };
    //return decoded['sub'];
  }
}
