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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const question_entity_1 = require("./entities/question.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const question_upvote_entity_1 = require("../question-upvote/entities/question-upvote.entity");
const keyword_entity_1 = require("../keyword/entities/keyword.entity");
let QuestionService = class QuestionService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(body) {
        return this.manager.transaction(async (manager) => {
            const other = await manager.findOne(question_entity_1.Question, { title: body.createQuestionDto.title });
            if (other)
                throw new common_1.BadRequestException(`Question with this title already exists.`);
            const question = await manager.create(question_entity_1.Question, body.createQuestionDto);
            question.owner = body.owner;
            console.log(question);
            return manager.save(question);
        });
    }
    async findOne(params) {
        let question = null;
        let relations = [];
        if (params.owner)
            relations.push('owner');
        if (params.answers)
            relations.push('answers');
        if (params.upvotes)
            relations.push('upvotes');
        if (params.keywords)
            relations.push('keywords');
        if (params.answersOwner)
            relations.push('answers.owner');
        if (params.upvotesOwner)
            relations.push('upvotes.owner');
        if (params.id) {
            question = await this.manager.findOne(question_entity_1.Question, params.id, { relations });
        }
        else if (params.title) {
            question = await this.manager.findOne(question_entity_1.Question, { title: params.title }, { relations });
        }
        if (question && params.id) {
            const count = await this.manager.query(`SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${params.id}`);
            question['upvotesCount'] = await parseInt(count[0]['count']);
        }
        return question;
    }
    async find(params) {
        let relations = [];
        if (params.owner)
            relations.push('owner');
        const questions = await this.manager.find(question_entity_1.Question, { relations });
        return questions;
    }
    async update(id, updateQuestionDto) {
        return this.manager.transaction(async (manager) => {
            const question = await manager.findOne(question_entity_1.Question, id);
            if (!question)
                throw new common_1.BadRequestException(`Question ${id} nto found.`);
            const other = await manager.findOne(question_entity_1.Question, { title: updateQuestionDto.title });
            if (other) {
                if (other.id !== id)
                    throw new common_1.BadRequestException(`Question with this title already exists.`);
            }
            manager.merge(question_entity_1.Question, question, updateQuestionDto);
            return manager.save(question);
        });
    }
    async remove(id) {
        const question = await this.manager.findOne(question_entity_1.Question, id);
        if (!question)
            throw new common_1.BadRequestException(`Question ${id} nto found.`);
        return this.manager.delete(question_entity_1.Question, id);
    }
    async AnswerCountUpvotes(id) {
        return this.manager.query(`SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${id}`);
    }
    async findUpvotes(id) {
        const question = await this.manager.findOne(question_entity_1.Question, id, { relations: ['upvotes', 'upvotes.owner'] });
        if (!question) {
            throw new common_1.NotFoundException(`Question ${id} not found.`);
        }
        return question.upvotes;
    }
    async findKeywords(id) {
        const question = await this.manager.findOne(question_entity_1.Question, id, { relations: ['keywords'] });
        if (!question) {
            throw new common_1.NotFoundException(`Question '${id}' not found.`);
        }
        return question.keywords;
    }
    async updKeywords(question_id, keyword_id, action) {
        return this.manager.transaction(async (manager) => {
            const question = await manager.findOne(question_entity_1.Question, question_id, { relations: ['owner', 'keywords'] });
            if (!question)
                throw new common_1.BadRequestException(`Question '${question_id}' does not exist.`);
            const keyword = await manager.findOne(keyword_entity_1.Keyword, keyword_id);
            if (!keyword)
                throw new common_1.BadRequestException(`Keyword '${keyword_id}' not found.`);
            let old_keywords = question.keywords;
            if (action === 'attach') {
                old_keywords.push(keyword);
            }
            else if (action === 'deattach') {
                const keywordsIds = [];
                old_keywords.forEach((word) => {
                    keywordsIds.push(word.id);
                });
                let index = -1;
                for (let i = 0; i < old_keywords.length; i++) {
                    if (old_keywords[i].id === keyword.id) {
                        index = i;
                        break;
                    }
                }
                if (index !== -1) {
                    old_keywords = old_keywords
                        .slice(0, index)
                        .concat(old_keywords.slice(index + 1, old_keywords.length));
                }
                else {
                    throw new common_1.BadRequestException(`Keyword '${keyword_id}' not in question '${question_id}'`);
                }
            }
            question.keywords = old_keywords;
            return manager.save(question);
        });
    }
    async isUpvoted(user_id, quest_id) {
        return this.manager.transaction(async (manager) => {
            const user = await manager.findOne(user_entity_1.User, user_id);
            const question = await manager.findOne(question_entity_1.Question, quest_id);
            return manager.find(question_upvote_entity_1.QuestionUpvote, { owner: user, question: question });
        });
    }
    async questionsCountUpvotes(body) {
        console.log('body');
        console.log(body);
        const questions = body.questions;
        for (let i = 0; i < questions.length; i++) {
            const count = await this.manager.query(`SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${questions[i].id}`);
            questions[i]['upvotesCount'] = await parseInt(count[0]['count']);
        }
        return questions;
    }
    async validateCreate(title) {
        const res = await this.manager.find(question_entity_1.Question, { title: title });
        return !res.length;
    }
    async validateUpdate(id, title) {
        const res = await this.manager.findOne(question_entity_1.Question, { title: title });
        return !res || (res && res['id'] === id);
    }
    async findStatsMonthly() {
        return this.manager.query(`SELECT to_char(public."question"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as questions
               FROM public."question"
               GROUP BY month`);
    }
    async findStatsDaily() {
        return this.manager.query(`SELECT to_char(public."question"."created_at", 'FMDay') as day,
                    COUNT(*) as questions
              FROM public."question"
              GROUP BY day`);
    }
};
QuestionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map