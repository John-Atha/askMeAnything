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
exports.KeywordService = void 0;
const common_1 = require("@nestjs/common");
const methods_1 = require("../../general-methods/methods");
const async_calls_1 = require("../../async_calls/async_calls");
let KeywordService = class KeywordService {
    constructor() { }
    async findQuestionsMonthly(params, id, year, month) {
        const query_params = {
            id,
            questions: true,
            questionsOwner: true,
        };
        const keyword = await async_calls_1.getOneKeyword(query_params);
        if (!keyword.data) {
            throw new common_1.NotFoundException(`Keyword '${id}' not found.`);
        }
        let questions = keyword.data.questions;
        questions = questions.filter((question) => {
            const date = new Date(question.updated_at);
            return (date.getFullYear() === year &&
                date.getMonth() === month);
        });
        questions = methods_1.paginate(questions, params);
        questions = await async_calls_1.countQuestionsUpvotes(questions);
        return questions.data;
    }
    async findAll(params, id, year, month) {
        const query_params = {
            id,
            questions: true,
            questionsOwner: true,
        };
        const keyword = await async_calls_1.getOneKeyword(query_params);
        if (!keyword.data) {
            throw new common_1.NotFoundException(`Keyword '${id}' not found.`);
        }
        let questions = keyword.data.questions;
        if (year && month) {
            questions = questions.filter((question) => {
                const date = new Date(question.updated_at);
                return (date.getFullYear() === year &&
                    date.getMonth() === month);
            });
        }
        else if (year && !month) {
            questions = questions.filter((question) => {
                const date = new Date(question.updated_at);
                return (date.getFullYear() === year);
            });
        }
        questions = methods_1.paginate(questions, params);
        questions = await async_calls_1.countQuestionsUpvotes(questions);
        return questions.data;
    }
    async findStatsMonthly(id) {
        const keyword = await async_calls_1.getOneKeyword({ id });
        if (!keyword.data) {
            throw new common_1.NotFoundException(`Keyword '${id}' not found.`);
        }
        const data = await async_calls_1.getKeywordStatsMonthly(id);
        return methods_1.monthlyCountsParseInt(data.data, 'questions');
    }
    async findStatsDaily(id) {
        const keyword = await async_calls_1.getOneKeyword({ id });
        if (!keyword.data) {
            throw new common_1.NotFoundException(`Keyword '${id}' not found.`);
        }
        const data = await async_calls_1.getKeywordStatsDaily(id);
        return methods_1.daysComplete(data.data, 'questions');
    }
    async findStats() {
        const data = await async_calls_1.getKeywordsStats();
        return data.data;
    }
};
KeywordService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], KeywordService);
exports.KeywordService = KeywordService;
//# sourceMappingURL=keyword.service.js.map