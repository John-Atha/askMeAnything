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
exports.QuestionUpvoteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const question_entity_1 = require("../question/entities/question.entity");
const question_upvote_entity_1 = require("./entities/question-upvote.entity");
let QuestionUpvoteService = class QuestionUpvoteService {
    constructor(manager) {
        this.manager = manager;
    }
    async findOne(params) {
        let upvote = null;
        if (params.id) {
            let relations = [];
            if (params.owner)
                relations.push('owner');
            if (params.question)
                relations.push('question');
            if (params.questionOwner)
                relations.push('question.owner');
            upvote = await this.manager.findOne(question_upvote_entity_1.QuestionUpvote, params.id, { relations });
        }
        return upvote;
    }
    async create(createQuestionUpvoteDto) {
        return this.manager.transaction(async (manager) => {
            const user_id = await createQuestionUpvoteDto.owner.id;
            const user = await manager.findOne(user_entity_1.User, user_id);
            const question_id = createQuestionUpvoteDto.question.id;
            const question = await manager.findOne(question_entity_1.Question, question_id, { relations: ['owner'] });
            if (!question)
                throw new common_1.NotFoundException(`Question '${question_id}' not found.`);
            const old = await manager.findOne(question_upvote_entity_1.QuestionUpvote, { owner: user, question: question });
            if (old)
                throw new common_1.BadRequestException(`You have already upvotes this question.`);
            const upvote = await manager.create(question_upvote_entity_1.QuestionUpvote, createQuestionUpvoteDto);
            upvote.owner = user;
            upvote.question = question;
            const owner = question.owner;
            owner.points++;
            await manager.save(owner);
            return manager.save(upvote);
        });
    }
    async remove(id) {
        return this.manager.transaction(async (manager) => {
            const upvote = await manager.findOne(question_upvote_entity_1.QuestionUpvote, id, {
                relations: ['owner', 'question', 'question.owner'],
            });
            if (!upvote)
                throw new common_1.NotFoundException(`Upvote '${id}' not found.`);
            const question = upvote.question;
            const owner = question.owner;
            if (owner.points)
                owner.points--;
            await manager.save(owner);
            return manager.delete(question_upvote_entity_1.QuestionUpvote, id);
        });
    }
};
QuestionUpvoteService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], QuestionUpvoteService);
exports.QuestionUpvoteService = QuestionUpvoteService;
//# sourceMappingURL=question-upvote.service.js.map