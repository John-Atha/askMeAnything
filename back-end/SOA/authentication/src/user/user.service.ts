import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createUser, deleteUser, getAllUsers, getOneUser, updateUser } from '../async_calls/async_calls';
import { paginate, verify } from '../../general_methods/methods';
import { jwtConstants } from '../../constants_auth';
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class UserService {
  constructor() {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    if (createUserDto.password === createUserDto.confirmation) {
      return createUser(createUserDto)
             .then(response => { return response.data })
             .catch(err => { throw new BadRequestException(err.response.data.message) });
    }
    else {
      throw new BadRequestException("Passwords don't match.");
    }
  }

  async findAll(params): Promise<any> {
    const res = await getAllUsers();
    return paginate(res.data, params);
  }

  async findOne(id: number): Promise<any> {
    const user = await getOneUser({ id });
    console.log(`user: ${user.data}`);
    if (!user.data) {
      throw new NotFoundException(`User '${id}' not found.`);
    }
    return user.data;
  }

  async update(id: number, updateUserDto: UpdateUserDto, req: any): Promise<any> {
    const req_user_id = verify(req);
    if (id!==req_user_id) {
      throw new UnauthorizedException();
    }
    return updateUser(id, updateUserDto)
            .then(response => { return response.data })
            .catch(err => { throw new BadRequestException(err.response.data.message) });
  }

  async remove(id: number, req: any): Promise<any> {
    const req_user_id = verify(req);
    if (id!==req_user_id) {
      throw new UnauthorizedException();
    }
    return deleteUser(id)
           .then(response => { return response.data })
           .catch(err => { throw new BadRequestException(err.response.data.message) });
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
