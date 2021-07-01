import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getOneUserWithPass } from '../async_calls/async_calls';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await getOneUserWithPass({ username });
    if (!user.data) return null;
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
