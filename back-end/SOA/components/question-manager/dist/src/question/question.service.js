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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const methods_1 = require("../../general-methods/methods");
const async_calls_1 = require("../../async_calls/async_calls");
let QuestionService = class QuestionService {
    constructor() { }
    async create(req, createQuestionDto) {
        const user_id = await methods_1.verify(req);
        const owner = await async_calls_1.getOneUser({ id: user_id });
        if (!owner.data) {
            throw new common_1.UnauthorizedException();
        }
        createQuestionDto['owner'] = {
            id: user_id,
        };
        return async_calls_1.createQuestion(createQuestionDto, owner.data)
            .then(response => { return response.data; })
            .catch(err => { throw new common_1.BadRequestException(err.response.data.message); });
    }
    async findOne(id) {
        let question = null;
        const params = {
            id,
            owner: true,
            upvotes: true,
        };
        question = await async_calls_1.getOneQuestion(params);
        console.log('question data:');
        console.log(question.data);
        if (!question.data) {
            throw new common_1.NotFoundException(`Question '${id}' not found.`);
        }
        return question.data;
    }
    async update(req, id, updateQuestionDto) {
        const user_id = await methods_1.verify(req);
        const params = {
            id,
            owner: true,
        };
        const question = await async_calls_1.getOneQuestion(params);
        if (!question.data) {
            throw new common_1.NotFoundException(`Question ${id} not found.`);
        }
        if (question.data.owner.id !== user_id) {
            throw new common_1.BadRequestException("You cannot update another user's question");
        }
        return async_calls_1.updateQuestion(id, updateQuestionDto)
            .then(response => { return response.data; })
            .catch(err => { throw new common_1.BadRequestException(err.response.data.message); });
    }
    async remove(req, id) {
        const user_id = await methods_1.verify(req);
        const params = {
            id,
            owner: true,
        };
        const question = await async_calls_1.getOneQuestion(params);
        if (!question.data) {
            throw new common_1.NotFoundException(`Question ${id} not found.`);
        }
        if (question.data.owner.id !== user_id) {
            throw new common_1.BadRequestException("You cannot delete another user's question.");
        }
        return async_calls_1.deleteQuestion(id);
    }
    async findQuestionsAnswers(id, paramsInit) {
        const params = {
            id,
            answers: true,
            answersOwner: true,
        };
        const question = await async_calls_1.getOneQuestion(params);
        if (!question.data) {
            throw new common_1.NotFoundException(`Question ${id} not found.`);
        }
        console.log(question.data.answers);
        let answers = await this.withCountAnswersUpvotes(question.data.answers);
        answers = answers.sort((a, b) => a['upvotesCount'] < b['upvotesCount'] ? 1 : -1);
        return methods_1.paginate(answers, paramsInit);
    }
    async withCountAnswersUpvotes(answers) {
        for (let i = 0; i < answers.length; i++) {
            const count = await async_calls_1.answerCountUpvotes(answers[i].id);
            answers[i]['upvotesCount'] = await parseInt(count.data[0]['count']);
        }
        ;
        return answers;
    }
    async findUpvotes(id, paramsInit) {
        const params = {
            id,
            upvotes: true,
            upvotesOwner: true,
        };
        const question = await async_calls_1.getOneQuestion(params);
        if (!question.data) {
            throw new common_1.NotFoundException(`Question ${id} not found.`);
        }
        return methods_1.paginate(question.data.upvotes, paramsInit);
    }
    async findKeywords(id) {
        const params = {
            id,
            keywords: true,
        };
        const question = await async_calls_1.getOneQuestion(params);
        if (!question.data) {
            throw new common_1.NotFoundException(`Question '${id}' not found.`);
        }
        return question.data.keywords;
    }
    async attachKeyword(req, question_id, keyword_id) {
        const user_id = await methods_1.verify(req);
        const params = {
            id: question_id,
            owner: true,
            keywords: true,
        };
        const question = await async_calls_1.getOneQuestion(params);
        if (!question.data) {
            throw new common_1.NotFoundException(`Question '${question_id} not found.`);
        }
        if (question.data.owner.id !== user_id) {
            console.log(question.data.owner);
            console.log(user_id);
            throw new common_1.BadRequestException(`Only the question's owner can modify it.`);
        }
        await async_calls_1.attachQuestionKeywords(question_id, keyword_id)
            .then(response => { console.log(response); })
            .catch(err => { throw new common_1.BadRequestException(err.response.data.message); });
        const newQuestion = await async_calls_1.getOneQuestion(params);
        return newQuestion.data;
    }
    async detachKeyword(req, question_id, keyword_id) {
        const user_id = await methods_1.verify(req);
        const params = {
            id: question_id,
            owner: true,
            keywords: true,
        };
        const question = await async_calls_1.getOneQuestion(params);
        if (!question.data) {
            throw new common_1.NotFoundException(`Question '${question_id} not found.`);
        }
        console.log(question.data.owner.id);
        console.log(user_id);
        if (question.data.owner.id !== user_id) {
            throw new common_1.BadRequestException(`Only the question's owner can modify it.`);
        }
        await async_calls_1.deAttachQuestionKeywords(question_id, keyword_id)
            .then(response => { console.log(response); })
            .catch(err => { throw new common_1.BadRequestException(err.response.data.message); });
        const newQuestion = await async_calls_1.getOneQuestion(params);
        return newQuestion.data;
    }
    async isUpvoted(req, id) {
        const user_id = await methods_1.verify(req);
        const user = await async_calls_1.getOneUser({ id: user_id });
        if (!user.data) {
            throw new common_1.UnauthorizedException();
        }
        const params = {
            id,
        };
        const question = await async_calls_1.getOneQuestion(params);
        if (!question.data) {
            throw new common_1.NotFoundException(`Question ${id} not found.`);
        }
        const upvote = await async_calls_1.questionIsUpvoted(user_id, id);
        if (!upvote.data.length) {
            return {
                upvoted: false,
            };
        }
        return {
            upvoted: true,
            id: upvote.data[0].id,
        };
    }
};
QuestionService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map