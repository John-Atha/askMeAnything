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
const typeorm_1 = require("@nestjs/typeorm");
const methods_1 = require("../../general_methods/methods");
const typeorm_2 = require("typeorm");
const question_entity_1 = require("./entities/question.entity");
let QuestionService = class QuestionService {
    constructor(manager) {
        this.manager = manager;
    }
    async findQuestionsAnswers(id, paramsInit) {
        const question = await this.manager.findOne(question_entity_1.Question, id, { relations: ['answers', 'answers.owner'] });
        if (!question) {
            throw new common_1.NotFoundException(`Question ${id} not found.`);
        }
        console.log(question.answers);
        let answers = await this.withCountAnswersUpvotes(question.answers);
        answers = await this.addNestedOwners(answers);
        answers = answers.sort((a, b) => a['upvotesCount'] < b['upvotesCount'] ? 1 : -1);
        return methods_1.paginate(answers, paramsInit);
    }
    async withCountAnswersUpvotes(answers) {
        for (let i = 0; i < answers.length; i++) {
            const count = await this.manager.query(`SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${answers[i].id}`);
            console.log('count:');
            console.log(count);
            answers[i]['upvotesCount'] = await parseInt(count[0]['count']);
        }
        ;
        return answers;
    }
    async addNestedOwners(answers) {
        for (let i = 0; i < answers.length; i++) {
            answers[i] = await methods_1.addNestedOwnerToObj(answers[i], answers[i].owner.id);
        }
        return answers;
    }
};
QuestionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map