"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const methods_1 = require("../../general-methods/methods");
const async_calls_1 = require("../../async_calls/async_calls");
let AnswerService = class AnswerService {
    async findMonthly(params, year, month) {
        let answers = await async_calls_1.getAnswers({ owner: true });
        answers = answers.data;
        answers = answers.filter((answer) => {
            const date = new Date(answer.updated_at);
            return (date.getFullYear() === year &&
                date.getMonth() === month);
        });
        answers = methods_1.paginate(answers, params);
        answers = await async_calls_1.countAnswersUpvotes(answers);
        return answers.data;
    }
    async findAll(params, year, month) {
        let answers = await async_calls_1.getAnswers({ owner: true });
        answers = answers.data;
        if (year && month) {
            answers = answers.filter((answer) => {
                const date = new Date(answer.updated_at);
                return (date.getFullYear() === year &&
                    date.getMonth() === month);
            });
        }
        else if (year && !month) {
            answers = answers.filter((answer) => {
                const date = new Date(answer.updated_at);
                return (date.getFullYear() === year);
            });
        }
        answers.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1);
        answers = methods_1.paginate(answers, params);
        answers = await async_calls_1.countAnswersUpvotes(answers);
        return answers.data;
    }
    async findStatsMonthly() {
        const data = await async_calls_1.getAnswersStatsMonthly();
        return methods_1.monthlyCountsParseInt(data.data, 'answers');
    }
    async findStatsDaily() {
        const data = await async_calls_1.getAnswersStatsDaily();
        return methods_1.daysComplete(data.data, 'answers');
    }
};
AnswerService = __decorate([
    common_1.Injectable()
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map