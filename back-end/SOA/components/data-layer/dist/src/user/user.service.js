"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require('bcrypt');
const saltRounds = 10;
let UserService = class UserService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(createUserDto) {
        return this.manager.transaction(async (manager) => {
            const same_username = await manager.findOne(user_entity_1.User, { username: createUserDto.username });
            const same_email = await manager.findOne(user_entity_1.User, { email: createUserDto.email });
            if (same_username)
                throw new common_1.BadRequestException(`Username already exists.`);
            if (same_email)
                throw new common_1.BadRequestException(`Email already exists.`);
            const user = await manager.create(user_entity_1.User, createUserDto);
            const hash = bcrypt.hashSync(user.password, saltRounds);
            user.password = hash;
            return manager.save(user);
        });
    }
    async findAll() {
        return this.manager.find(user_entity_1.User);
    }
    async findOne(conditions) {
        let user = null;
        let { id, username, email } = conditions;
        console.log(conditions);
        if (id)
            user = await this.manager.findOne(user_entity_1.User, id);
        else if (username)
            user = await this.manager.findOne(user_entity_1.User, { username });
        else if (email)
            user = await this.manager.findOne(user_entity_1.User, { email });
        return user;
    }
    async findOneWithPass(conditions) {
        let user = null;
        let { id, username, email } = conditions;
        console.log(conditions);
        if (id)
            user = await this.manager.findOne(user_entity_1.User, id);
        else if (username)
            user = await this.manager.findOne(user_entity_1.User, { username });
        else if (email)
            user = await this.manager.findOne(user_entity_1.User, { email });
        if (user)
            user['pass'] = user['password'];
        return user;
    }
    async update(id, updateUserDto) {
        return this.manager.transaction(async (manager) => {
            const same_username = await manager.findOne(user_entity_1.User, { username: updateUserDto.username });
            const same_email = await manager.findOne(user_entity_1.User, { email: updateUserDto.email });
            if (same_username && same_username.id !== id)
                throw new common_1.BadRequestException(`Username already exists.`);
            if (same_email && same_email.id !== id)
                throw new common_1.BadRequestException(`Email already exists.`);
            const user = await manager.findOne(user_entity_1.User, id);
            if (!user)
                throw new common_1.BadRequestException(`User '${id}' not found.`);
            const newUser = await manager.merge(user_entity_1.User, user, updateUserDto);
            return manager.save(newUser);
        });
    }
    async remove(id) {
        return this.manager.transaction(async (manager) => {
            const user = await manager.findOne(user_entity_1.User, id);
            if (!user)
                throw new common_1.BadRequestException(`User '${id}' not found.`);
            return this.manager.delete(user_entity_1.User, id);
        });
    }
    async findAnswered(id, params) {
        console.log(id);
        console.log(params);
        if (params.year && params.month) {
            if (params.month < 10)
                params.month = '0' + params.month;
            return this.manager.query(`SELECT DISTINCT public."question"."id",
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
                   AND to_char(public."answer"."created_at", 'YYYY-MM')='${params.year}-${params.month}'`);
        }
        else if (params.year && !params.month) {
            return this.manager.query(`SELECT DISTINCT public."question"."id",
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
                   AND to_char(public."answer"."created_at", 'YYYY')='${params.year}'`);
        }
        else {
            return this.manager.query(`SELECT DISTINCT public."question"."id",
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
                   AND public."question"."id"=public."answer"."questionId"`);
        }
    }
    async findQuestionsStatsMonthly(id) {
        return this.manager.query(`SELECT to_char(public."question"."created_at", 'YYYY-MM') as month,
              COUNT(*) as questions
      FROM public."question"
      WHERE public."question"."ownerId"=${id}
      GROUP BY month`);
    }
    async findAnswersStatsMonthly(id) {
        return this.manager.query(`SELECT to_char(public."answer"."created_at", 'YYYY-MM') as month,
                    COUNT(*) as answers
             FROM public."answer"
             WHERE public."answer"."ownerId"=${id}
             GROUP BY month`);
    }
    async findQuestionsStatsDaily(id) {
        return this.manager.query(`SELECT to_char(public."question"."created_at", 'FMDay') as day,
                      COUNT(*) as questions
               FROM public."question"
               WHERE public."question"."ownerId"=${id}
               GROUP BY day`);
    }
    async findAnswersStatsDaily(id) {
        return this.manager.query(`SELECT to_char(public."answer"."created_at", 'FMDay') as day,
                     COUNT(*) as answers
             FROM public."answer"
             WHERE public."answer"."ownerId"=${id}
             GROUP BY day`);
    }
    async ranking() {
        return this.manager
            .createQueryBuilder()
            .select('user')
            .from(user_entity_1.User, 'user')
            .orderBy('user.points', 'DESC')
            .addOrderBy('user.username', 'ASC')
            .getMany();
    }
    async findAnsweredStatsMonthly(id) {
        return this.manager.query(`SELECT COUNT (DISTINCT public."question"."id") as answered,
              to_char(public."answer"."created_at", 'YYYY-MM') as month
       FROM  public."answer", public."question", public."user"
       WHERE public."answer"."ownerId"=${id}
         AND public."user"."id"=${id}
         AND public."question"."id"=public."answer"."questionId"
       GROUP BY month`);
    }
    async findAnsweredStatsDaily(id) {
        return this.manager.query(`SELECT COUNT (DISTINCT public."question"."id") as answered,
              to_char(public."answer"."created_at", 'FMDay') as day
       FROM  public."answer", public."question", public."user"
       WHERE public."answer"."ownerId"=${id}
         AND public."user"."id"=${id}
         AND public."question"."id"=public."answer"."questionId"
       GROUP BY day`);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map