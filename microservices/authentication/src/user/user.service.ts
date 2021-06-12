import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
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
        const user = await this.manager.create(User, createUserDto);
        const hash = bcrypt.hashSync(user.password, saltRounds);
        user.password = hash;
        const res = await this.manager.save(user);
        /* ----------------- HERE I WILL BROADCAST IT TO CHOREOGRAPHER CHANNEL -------------------- */
        /* ---------------------------------------------------------------------------------------- */
        return res;
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
    const res = await this.manager.find(User);
    return paginate(res, params);
  }

  async findOne(id: number): Promise<any> {
    const user = await this.manager.findOne(User, id);
    if (!user) {
      throw new NotFoundException(`User '${id}' not found.`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, req: any): Promise<any> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      const req_user_id = verify(req);
      if (!user) {
        throw new NotFoundException(`User ${id} not found.`);
      }
      else if (user.id!==req_user_id) {
        throw new UnauthorizedException();
      }
      else {
        const valid = await this.validUpdate(user.id, updateUserDto.username, updateUserDto.email)
        if (valid) {
          const newUser = await manager.merge(User, user, updateUserDto);
          return manager.save(newUser);
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
      const user = await manager.findOne(User, id);
      if (!user) {
        throw new NotFoundException(`User ${id} not found.`);
      }
      else if (id!==req_user_id /* || user.data.username!==req_user.username*/) {
        throw new UnauthorizedException();
      }
      //return deleteUser(id);
      const res = await manager.delete(User, id)
        /* ----------------- HERE I WILL BROADCAST IT TO CHOREOGRAPHER CHANNEL -------------------- */
        /* ---------------------------------------------------------------------------------------- */
        return res;
    });
  }

  async validRegister(username: string, email: string): Promise<boolean> {
    const res1 = await this.manager.findOne(User, { username: username });
    const res2 = await this.manager.findOne(User, { email: email });
    return !res1 && !res2;
  }

  async validUpdate(id: number, username: string, email:string): Promise<boolean> {
    const res1 = await this.manager.findOne(User, { username: username });
    const res2 = await this.manager.findOne(User, { email: email });
    return (
      (!res1 || (res1 && res1['id'] === id)) &&
      (!res2 || (res2 && res2['id'] === id))
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
    console.log({ 
      username: decoded['username'],
      id: decoded['sub'],
    });
    return { 
      username: decoded['username'],
      id: decoded['sub'],
    };
    //return decoded['sub'];
  }
}
