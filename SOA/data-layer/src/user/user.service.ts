import {
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { paginate } from 'general_methods/methods';
import { Console } from 'console';
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';

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

  async remove(id: number): Promise<any> {
    return this.manager.delete(User, id);
  }

  async findAnswered(id: number, params: any) {
    console.log(id);
    console.log(params);
    if (params.year && params.month) {
      if (params.month<10) params.month = '0' + params.month;
      return this.manager.query(
        `SELECT DISTINCT public."question"."id",
                      public."question"."title",
                      public."question"."text",
                      public."question"."created_at",
                      public."question"."updated_at",
                      public."user"."id" as ownerId,
                      public."user"."email",
                      public."user"."username",
                      public."user"."points"
                 FROM  public."answer", public."question", public."user"
                 WHERE public."answer"."ownerId"=${id}
                   AND public."user"."id"=${id}
                   AND public."question"."id"=public."answer"."questionId"
                   AND to_char(public."answer"."created_at", 'YYYY-MM')='${params.year}-${params.month}'`,
      );
    }
    else if (params.year && !params.month) {
      return this.manager.query(
        `SELECT DISTINCT public."question"."id",
                      public."question"."title",
                      public."question"."text",
                      public."question"."created_at",
                      public."question"."updated_at",
                      public."user"."id" as ownerId,
                      public."user"."email",
                      public."user"."username",
                      public."user"."points"
                 FROM  public."answer", public."question", public."user"
                 WHERE public."answer"."ownerId"=${id}
                   AND public."user"."id"=${id}
                   AND public."question"."id"=public."answer"."questionId"
                   AND to_char(public."answer"."created_at", 'YYYY')='${params.year}'`,
        );
    }
    else {
      return this.manager.query(
        `SELECT DISTINCT public."question"."id",
                      public."question"."title",
                      public."question"."text",
                      public."question"."created_at",
                      public."question"."updated_at",
                      public."user"."id" as ownerId,
                      public."user"."email",
                      public."user"."username",
                      public."user"."points"
                 FROM  public."answer", public."question", public."user"
                 WHERE public."answer"."ownerId"=${id}
                   AND public."user"."id"=${id}
                   AND public."question"."id"=public."answer"."questionId"`,
        );
    }
  }
}
