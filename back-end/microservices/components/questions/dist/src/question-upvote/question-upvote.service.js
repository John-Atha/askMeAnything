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
const methods_1 = require("../../general_methods/methods");
const async_calls_1 = require("../../async_calls/async_calls");
let QuestionUpvoteService = class QuestionUpvoteService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(req, createQuestionUpvoteDto) {
        return this.manager.transaction(async (manager) => {
            const user_id = await methods_1.verify(req);
            console.log(`Decoded user id: ${user_id}`);
            const user = await manager.findOne(user_entity_1.User, user_id);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            const question_id = createQuestionUpvoteDto.question.id;
            const question = await manager.findOne(question_entity_1.Question, question_id, { relations: ['owner'] });
            if (!question) {
                throw new common_1.NotFoundException(`Question '${question_id}' not found.`);
            }
            const allowed = await this.validateCreate(user, question);
            if (!allowed) {
                throw new common_1.BadRequestException(`You have already upvoted this question.`);
            }
            createQuestionUpvoteDto['owner'] = {
                id: user.id,
            };
            const upvote = await manager.create(question_upvote_entity_1.QuestionUpvote, createQuestionUpvoteDto);
            upvote.owner = user;
            upvote.question = question;
            let owner = question.owner;
            const token = methods_1.getToken(req);
            owner = await async_calls_1.pointsUpd(owner.id, token, 'incr');
            const newUpv = await manager.save(upvote);
            await methods_1.addNestedOwnerToObj(upvote.question, upvote.question.owner.id);
            return methods_1.addNestedOwnerToObj(newUpv, user.id);
        });
    }
    async remove(req, id) {
        return this.manager.transaction(async (manager) => {
            const user_id = await methods_1.verify(req);
            const user = await manager.findOne(user_entity_1.User, user_id);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            const upvote = await manager.findOne(question_upvote_entity_1.QuestionUpvote, id, {
                relations: ['owner', 'question', 'question.owner'],
            });
            if (!upvote) {
                throw new common_1.NotFoundException(`Upvote '${id}' not found.`);
            }
            if (user.id !== upvote.owner.id) {
                throw new common_1.BadRequestException(`You cannot delete another user's upvote.`);
            }
            const token = methods_1.getToken(req);
            let owner = upvote.question.owner;
            owner = await async_calls_1.pointsUpd(owner.id, token, 'decr');
            return manager.delete(question_upvote_entity_1.QuestionUpvote, id);
        });
    }
    async validateCreate(owner, question) {
        const upvotes = await this.manager.find(question_upvote_entity_1.QuestionUpvote, { owner, question });
        return !upvotes.length;
    }
};
QuestionUpvoteService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], QuestionUpvoteService);
exports.QuestionUpvoteService = QuestionUpvoteService;
//# sourceMappingURL=question-upvote.service.js.map