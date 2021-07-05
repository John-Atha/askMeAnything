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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const methods_1 = require("../../general_methods/methods");
const user_entity_1 = require("../user/entities/user.entity");
const answer_entity_1 = require("./entities/answer.entity");
const question_entity_1 = require("../question/entities/question.entity");
const answer_upvote_entity_1 = require("../answer-upvote/entities/answer-upvote.entity");
const async_calls_1 = require("../../async_calls/async_calls");
let AnswerService = class AnswerService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(req, createAnswerDto) {
        return this.manager.transaction(async (manager) => {
            const user_id = await methods_1.verify(req);
            const owner = await manager.findOne(user_entity_1.User, user_id);
            if (!owner) {
                throw new common_1.UnauthorizedException();
            }
            const question_id = createAnswerDto.question.id;
            const question = await manager.findOne(question_entity_1.Question, question_id);
            if (!question) {
                throw new common_1.NotFoundException(`Question '${question_id}' not found.`);
            }
            createAnswerDto['owner'] = {
                id: user_id,
            };
            let answer = await manager.create(answer_entity_1.Answer, createAnswerDto);
            answer = await methods_1.addNestedOwnerToObj(answer, user_id);
            answer = await methods_1.addNestedQuestionToObj(answer, question_id);
            const res = await manager.save(answer);
            async_calls_1.choreoPost('post', res, -1, 'answer')
                .then(response => {
                console.log(response.data);
            })
                .catch(err => {
                console.log(err);
            });
            return res;
        });
    }
    async update(req, id, updateAnswerDto) {
        return this.manager.transaction(async (manager) => {
            const user_id = await methods_1.verify(req);
            const user = await manager.findOne(user_entity_1.User, user_id);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            let answer = await manager.findOne(answer_entity_1.Answer, id, { relations: ['owner', 'question'] });
            if (!answer) {
                throw new common_1.NotFoundException(`Answer '${id}' not found.`);
            }
            if (user.id !== answer.owner.id) {
                throw new common_1.BadRequestException(`You cannot update another user's answer.`);
            }
            answer = await methods_1.addNestedOwnerToObj(answer, user_id);
            const question = answer.question;
            answer = await methods_1.addNestedQuestionToObj(answer, question.id);
            const text = updateAnswerDto.text;
            if (!text) {
                return answer;
            }
            answer.text = text;
            const res = await manager.save(answer);
            async_calls_1.choreoPost('patch', res, id, 'answer')
                .then(response => {
                console.log(response.data);
            })
                .catch(err => {
                console.log(err);
            });
            return res;
        });
    }
    async remove(req, id) {
        return this.manager.transaction(async (manager) => {
            const user_id = await methods_1.verify(req);
            const user = await manager.findOne(user_entity_1.User, user_id);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            const answer = await manager.findOne(answer_entity_1.Answer, id, { relations: ['owner'] });
            if (!answer) {
                throw new common_1.NotFoundException(`Answer '${id}' not found.`);
            }
            if (user.id !== answer.owner.id) {
                throw new common_1.BadRequestException(`You cannot delete another user's answer.`);
            }
            const res = await manager.delete(answer_entity_1.Answer, id);
            async_calls_1.choreoPost('delete', { id }, id, 'answer')
                .then(response => {
                console.log(response.data);
            })
                .catch(err => {
                console.log(err);
            });
            return res;
        });
    }
    async findOne(id) {
        let answer = await this.manager.findOne(answer_entity_1.Answer, id, { relations: ['owner', 'question'] });
        if (!answer) {
            throw new common_1.NotFoundException(`Answer '${id}' not found.`);
        }
        answer = await methods_1.addNestedOwnerToObj(answer, answer.owner.id);
        answer = await methods_1.addNestedQuestionToObj(answer, answer.question.id);
        let count = await this.manager.query(`SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${id}`);
        count = await parseInt(count[0]['count']);
        answer['upvotesCount'] = count;
        return answer;
    }
    async findOneUpvotes(id, params) {
        const answer = await this.manager.findOne(answer_entity_1.Answer, id, { relations: ['upvotes', 'upvotes.owner'] });
        if (!answer) {
            throw new common_1.NotFoundException(`Answer '${id}' not found.`);
        }
        for (let i = 0; i < answer.upvotes.length; i++) {
            answer.upvotes[i] = await methods_1.addNestedOwnerToObj(answer.upvotes[i], answer.upvotes[i].owner.id);
        }
        return methods_1.paginate(answer.upvotes, params);
    }
    async countOneUpvotes(id) {
        const answer = await this.manager.findOne(answer_entity_1.Answer, id);
        if (!answer) {
            throw new common_1.NotFoundException(`Answer '${id}' not found.`);
        }
        let count = await this.manager.query(`SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${id}`);
        count = await parseInt(count[0]['count']);
        return { upvotes: count };
    }
    async isUpvoted(id, req) {
        return this.manager.transaction(async (manager) => {
            const user_id = await methods_1.verify(req);
            const user = await manager.findOne(user_entity_1.User, user_id);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            const answer = await manager.findOne(answer_entity_1.Answer, id);
            if (!answer) {
                throw new common_1.NotFoundException(`Answer '${id}' not found.`);
            }
            const upvote = await manager.find(answer_upvote_entity_1.AnswerUpvote, { owner: user, answer });
            if (!upvote.length) {
                return {
                    upvoted: false,
                };
            }
            return {
                upvoted: true,
                id: upvote[0].id,
            };
        });
    }
};
AnswerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map