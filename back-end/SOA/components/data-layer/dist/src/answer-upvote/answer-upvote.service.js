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
const user_entity_1 = require("../user/entities/user.entity");
const answer_entity_1 = require("../answer/entities/answer.entity");
const answer_upvote_entity_1 = require("./entities/answer-upvote.entity");
let AnswerUpvoteService = class AnswerUpvoteService {
    constructor(manager) {
        this.manager = manager;
    }
    async findOne(params) {
        let upvote = null;
        if (params.id) {
            let relations = [];
            if (params.owner)
                relations.push('owner');
            if (params.answer)
                relations.push('answer');
            if (params.answerOwner)
                relations.push('answer.owner');
            upvote = await this.manager.findOne(answer_upvote_entity_1.AnswerUpvote, params.id, { relations });
        }
        return upvote;
    }
    async create(createAnswerUpvoteDto) {
        return this.manager.transaction(async (manager) => {
            let upvote = null;
            if (createAnswerUpvoteDto.owner.id && createAnswerUpvoteDto.answer.id) {
                const owner = await manager.findOne(user_entity_1.User, createAnswerUpvoteDto.owner.id);
                const answer = await manager.findOne(answer_entity_1.Answer, createAnswerUpvoteDto.answer.id, { relations: ['owner'] });
                const old = await manager.findOne(answer_upvote_entity_1.AnswerUpvote, { owner, answer });
                if (old)
                    throw new common_1.BadRequestException(`You have already upvoted this answer.`);
                const upvote = await manager.create(answer_upvote_entity_1.AnswerUpvote, createAnswerUpvoteDto);
                upvote.owner = owner;
                upvote.answer = answer;
                const answer_owner = answer.owner;
                answer_owner.points++;
                await manager.save(answer_owner);
                return manager.save(upvote);
            }
            return upvote;
        });
    }
    async remove(id) {
        return this.manager.transaction(async (manager) => {
            const upvote = await manager.findOne(answer_upvote_entity_1.AnswerUpvote, id, { relations: ['owner', 'answer', 'answer.owner'] });
            if (!upvote)
                throw new common_1.BadRequestException(`Upvote '${id}' not found`);
            const answer_owner = upvote.answer.owner;
            if (answer_owner.points)
                answer_owner.points--;
            await manager.save(answer_owner);
            return manager.delete(answer_upvote_entity_1.AnswerUpvote, id);
        });
    }
};
AnswerUpvoteService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], AnswerUpvoteService);
exports.AnswerUpvoteService = AnswerUpvoteService;
//# sourceMappingURL=answer-upvote.service.js.map