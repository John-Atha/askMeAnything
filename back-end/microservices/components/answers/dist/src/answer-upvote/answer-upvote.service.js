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
exports.AnswerUpvoteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const methods_1 = require("../../general_methods/methods");
const user_entity_1 = require("../user/entities/user.entity");
const answer_entity_1 = require("../answer/entities/answer.entity");
const answer_upvote_entity_1 = require("./entities/answer-upvote.entity");
const async_calls_1 = require("../../async_calls/async_calls");
let AnswerUpvoteService = class AnswerUpvoteService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(req, createAnswerUpvoteDto) {
        return this.manager.transaction(async (manager) => {
            const user_id = await methods_1.verify(req);
            const owner = await manager.findOne(user_entity_1.User, user_id);
            if (!owner) {
                throw new common_1.UnauthorizedException();
            }
            const answer_id = createAnswerUpvoteDto.answer.id;
            const answer = await manager.findOne(answer_entity_1.Answer, answer_id, { relations: ['owner'] });
            if (!answer) {
                throw new common_1.NotFoundException(`Answer '${answer_id}' not found.`);
            }
            const allowed = await this.validateCreate(owner, answer);
            if (!allowed) {
                throw new common_1.BadRequestException(`You have already upvoted this answer.`);
            }
            createAnswerUpvoteDto['owner'] = {
                id: owner.id,
            };
            console.log(createAnswerUpvoteDto);
            let upvote = await manager.create(answer_upvote_entity_1.AnswerUpvote, createAnswerUpvoteDto);
            upvote.answer = answer;
            const token = methods_1.getToken(req);
            const newOwner = await async_calls_1.pointsUpd(answer.owner.id, token, 'incr');
            upvote.answer.owner = newOwner.data;
            upvote = await methods_1.addNestedOwnerToObj(upvote, upvote.owner.id);
            console.log('----------------------------------------------Fine till here.');
            console.log(upvote);
            return manager.save(upvote);
        });
    }
    async remove(req, id) {
        return this.manager.transaction(async (manager) => {
            const user_id = await methods_1.verify(req);
            const user = await manager.findOne(user_entity_1.User, user_id);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            const upvote = await manager.findOne(answer_upvote_entity_1.AnswerUpvote, id, { relations: ['owner', 'answer', 'answer.owner'] });
            if (!upvote) {
                throw new common_1.NotFoundException(`Upvote '${id}' not found.`);
            }
            if (upvote.owner.id !== user.id) {
                throw new common_1.BadRequestException(`You cannot delete another user's upvote.`);
            }
            const token = methods_1.getToken(req);
            await async_calls_1.pointsUpd(upvote.answer.owner.id, token, 'decr');
            return manager.delete(answer_upvote_entity_1.AnswerUpvote, id);
        });
    }
    async validateCreate(user, answer) {
        const upvotes = await this.manager.find(answer_upvote_entity_1.AnswerUpvote, { owner: user, answer: answer });
        return !upvotes.length;
    }
};
AnswerUpvoteService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], AnswerUpvoteService);
exports.AnswerUpvoteService = AnswerUpvoteService;
//# sourceMappingURL=answer-upvote.service.js.map