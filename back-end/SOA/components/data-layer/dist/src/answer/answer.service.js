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
const question_entity_1 = require("../question/entities/question.entity");
const answer_entity_1 = require("./entities/answer.entity");
const answer_upvote_entity_1 = require("../answer-upvote/entities/answer-upvote.entity");
const user_entity_1 = require("../user/entities/user.entity");
let AnswerService = class AnswerService {
    constructor(manager) {
        this.manager = manager;
    }
    async findOne(params) {
        let answer = null;
        console.log(`params:`);
        console.log(params);
        if (params.id) {
            let relations = [];
            if (params.owner)
                relations.push('owner');
            answer = await this.manager.findOne(answer_entity_1.Answer, params.id, { relations });
            if (answer) {
                const count = await this.manager.query(`SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${params.id}`);
                answer['upvotesCount'] = await parseInt(count[0]['count']);
            }
        }
        console.log('answer:');
        console.log(answer);
        return answer;
    }
    async find(params) {
        let relations = [];
        if (params.owner)
            relations.push('owner');
        if (params.question)
            relations.push('question');
        if (params.questionOwner)
            relations.push('question.owner');
        const answers = await this.manager.find(answer_entity_1.Answer, { relations });
        return answers;
    }
    async findOneUpvotes(id) {
        let answer = null;
        answer = await this.manager.findOne(answer_entity_1.Answer, id, { relations: ['upvotes', 'upvotes.owner'] });
        return answer;
    }
    async isUpvoted(answer_id, user_id) {
        return this.manager.transaction(async (manager) => {
            const user = await manager.findOne(user_entity_1.User, user_id);
            const answer = await manager.findOne(answer_entity_1.Answer, answer_id);
            const upvote = await manager.find(answer_upvote_entity_1.AnswerUpvote, { owner: user, answer: answer });
            return upvote;
        });
    }
    async create(body) {
        return this.manager.transaction(async (manager) => {
            const owner = await manager.findOne(user_entity_1.User, body.owner_id);
            const question = await manager.findOne(question_entity_1.Question, body.question_id);
            if (!question) {
                throw new common_1.NotFoundException(`Question '${body.question_id}' not found.`);
            }
            const answer = await manager.create(answer_entity_1.Answer, body.createAnswerDto);
            answer.owner = owner;
            answer.question = question;
            return manager.save(answer);
        });
    }
    async update(id, updateAnswerDto) {
        return this.manager.transaction(async (manager) => {
            const answer = await manager.findOne(answer_entity_1.Answer, id, { relations: ['owner'] });
            if (!answer)
                throw new common_1.NotFoundException(`Answer '${id}' not found.`);
            const text = updateAnswerDto.text;
            answer.text = text;
            return manager.save(answer);
        });
    }
    async remove(id) {
        return this.manager.transaction(async (manager) => {
            const answer = manager.findOne(answer_entity_1.Answer, id);
            if (!answer)
                throw new common_1.NotFoundException(`Answer '${id}' not found.`);
            return this.manager.delete(answer_entity_1.Answer, id);
        });
    }
    async answersAndQuestionsCountUpvotes(body) {
        const answers = body.answers || [];
        for (let i = 0; i < answers.length; i++) {
            const count = await this.manager.query(`SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${answers[i].id}`);
            answers[i]['upvotesCount'] = await parseInt(count[0]['count']);
            const question = answers[i].question;
            const count2 = await this.manager.query(`SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${question.id}`);
            question['upvotesCount'] = await parseInt(count2[0]['count']);
        }
        return answers;
    }
    async answersCountUpvotes(body) {
        const answers = body.answers || [];
        for (let i = 0; i < answers.length; i++) {
            const count = await this.manager.query(`SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${answers[i].id}`);
            answers[i]['upvotesCount'] = await parseInt(count[0]['count']);
        }
        return answers;
    }
    async findStatsMonthly() {
        return this.manager.query(`SELECT to_char(public."answer"."created_at", 'YYYY-MM') as month,
                    COUNT(*) as answers
               FROM public."answer"
               GROUP BY month`);
    }
    async findStatsDaily() {
        return this.manager.query(`SELECT to_char(public."answer"."created_at", 'FMDay') as day,
                    COUNT(*) as answers
              FROM public."answer"
              GROUP BY day`);
    }
};
AnswerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map