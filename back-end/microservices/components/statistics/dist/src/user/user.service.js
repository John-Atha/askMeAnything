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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const methods_1 = require("../../general_methods/methods");
const user_entity_1 = require("../user/entities/user.entity");
let UserService = class UserService {
    constructor(manager) {
        this.manager = manager;
    }
    async findQuestionsStatsMonthly(id) {
        return this.manager.transaction(async (manager) => {
            const user = await manager.findOne(user_entity_1.User, id);
            if (!user) {
                throw new common_1.NotFoundException(`User '${id}' not found.`);
            }
            const data = await this.manager.query(`SELECT to_char(public."question"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as questions
               FROM public."question"
               WHERE public."question"."ownerId"=${id}
               GROUP BY month`);
            return methods_1.monthlyCountsParseInt(data, 'questions');
        });
    }
    async findAnswersStatsMonthly(id) {
        return this.manager.transaction(async (manager) => {
            const user = await manager.findOne(user_entity_1.User, id);
            if (!user) {
                throw new common_1.NotFoundException(`User '${id}' not found.`);
            }
            const data = await this.manager.query(`SELECT to_char(public."answer"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as answers
               FROM public."answer"
               WHERE public."answer"."ownerId"=${id}
               GROUP BY month`);
            return methods_1.monthlyCountsParseInt(data, 'answers');
        });
    }
    async findQuestionsStatsDaily(id) {
        return this.manager.transaction(async (manager) => {
            const user = await manager.findOne(user_entity_1.User, id);
            if (!user) {
                throw new common_1.NotFoundException(`User '${id}' not found.`);
            }
            const data = await manager.query(`SELECT to_char(public."question"."created_at", 'FMDay') as day,
                        COUNT(*) as questions
                 FROM public."question"
                 WHERE public."question"."ownerId"=${id}
                 GROUP BY day`);
            return methods_1.daysComplete(data, 'questions');
        });
    }
    async findAnswersStatsDaily(id) {
        return this.manager.transaction(async (manager) => {
            const user = await manager.findOne(user_entity_1.User, id);
            if (!user) {
                throw new common_1.NotFoundException(`User '${id}' not found.`);
            }
            const data = await manager.query(`SELECT to_char(public."answer"."created_at", 'FMDay') as day,
                       COUNT(*) as answers
               FROM public."answer"
               WHERE public."answer"."ownerId"=${id}
               GROUP BY day`);
            return methods_1.daysComplete(data, 'answers');
        });
    }
    async ranking(req, params) {
        let user_id = null;
        let position = null;
        try {
            user_id = await methods_1.verify(req);
        }
        catch (_a) {
            ;
        }
        const users = await this.manager
            .createQueryBuilder()
            .select('user')
            .from(user_entity_1.User, 'user')
            .orderBy('user.points', 'DESC')
            .addOrderBy('user.username', 'ASC')
            .getMany();
        if (user_id) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id === user_id) {
                    position = i + 1;
                    break;
                }
            }
        }
        return {
            ranking: methods_1.paginate(users, params),
            position: position,
        };
    }
    async findAnsweredStatsMonthly(id) {
        return this.manager.transaction(async (manager) => {
            const user = await manager.findOne(user_entity_1.User, id);
            if (!user) {
                throw new common_1.NotFoundException(`User '${id}' not found.`);
            }
            const data = await manager.query(`SELECT COUNT (DISTINCT public."question"."id") as answered,
                to_char(public."answer"."created_at", 'YYYY-MM') as month
         FROM  public."answer", public."question", public."user"
         WHERE public."answer"."ownerId"=${id}
           AND public."user"."id"=${id}
           AND public."question"."id"=public."answer"."questionId"
         GROUP BY month`);
            return methods_1.monthlyCountsParseInt(data, 'answered');
        });
    }
    async findAnsweredStatsDaily(id) {
        return this.manager.transaction(async (manager) => {
            const user = await manager.findOne(user_entity_1.User, id);
            if (!user) {
                throw new common_1.NotFoundException(`User '${id}' not found.`);
            }
            const data = await this.manager.query(`SELECT COUNT (DISTINCT public."question"."id") as answered,
                to_char(public."answer"."created_at", 'FMDay') as day
         FROM  public."answer", public."question", public."user"
         WHERE public."answer"."ownerId"=${id}
           AND public."user"."id"=${id}
           AND public."question"."id"=public."answer"."questionId"
         GROUP BY day`);
            return methods_1.daysComplete(data, 'answered');
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map