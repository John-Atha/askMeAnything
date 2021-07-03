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
    async findAll(params, year, month) {
        let questions = await async_calls_1.getQuestions({ owner: true });
        questions = questions.data;
        if (year && month) {
            questions = questions.filter((question) => {
                const date = new Date(question.created_at);
                return (date.getFullYear() === year &&
                    date.getMonth() === month);
            });
        }
        else if (year && !month) {
            questions = questions.filter((question) => {
                const date = new Date(question.created_at);
                return (date.getFullYear() === year);
            });
        }
        questions.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1);
        questions = methods_1.paginate(questions, params);
        questions = await async_calls_1.countQuestionsUpvotes(questions);
        return questions.data;
    }
    async findStatsMonthly() {
        const data = await async_calls_1.getQuestionsStatsMonthly();
        return methods_1.monthlyCountsParseInt(data.data, 'questions');
    }
    async findStatsDaily() {
        const data = await async_calls_1.getQuestionsStatsDaily();
        return methods_1.daysComplete(data.data, 'questions');
    }
};
QuestionService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map