import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
//const md5 = require('md5');
//const MD5 = require('crypto-js/md5');

const bcrypt = require('bcrypt');
const saltRounds = 10;


@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager()
    private manager: EntityManager,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.manager.findOne(User, { username: username });
    const match = await bcrypt.compare(pass, user ? user.password : '');
    if (match) {
      const { password, ...result } = user;
      return result;
    }
    else {
      return null;
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
