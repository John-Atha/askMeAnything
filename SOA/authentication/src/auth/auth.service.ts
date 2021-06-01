import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { getOneUserWithPass } from '../async_calls/async_calls';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager()
    private manager: EntityManager,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    //const user = await this.manager.findOne(User, { username: username });
    const user = await getOneUserWithPass({ username });
    console.log('user:');
    console.log(user);
    const match = await bcrypt.compare(pass, user.data ? user.data.pass : '');
    if (match) {
      const { password, ...result } = user.data;
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
