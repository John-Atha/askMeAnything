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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const methods_1 = require("../../general-methods/methods");
const async_calls_1 = require("../../async_calls/async_calls");
let UserService = class UserService {
    constructor() { }
    async findAllQuestions(params, id, year, month) {
        const user = await async_calls_1.getOneUser({ id });
        if (!user.data) {
            throw new common_1.NotFoundException(`User '${id}' not found.`);
        }
        let questions = await async_calls_1.getQuestions({ owner: true });
        questions = questions.data;
        if (year && month) {
            questions = questions.filter((question) => {
                console.log(question);
                const date = new Date(question.updated_at);
                return (question.owner.id === id &&
                    date.getFullYear() === year &&
                    date.getMonth() === month);
            });
        }
        else if (year && !month) {
            questions = questions.filter((question) => {
                const date = new Date(question.updated_at);
                return (question.owner.id === id &&
                    date.getFullYear() === year);
            });
        }
        else {
            questions = questions.filter((question) => {
                return question.owner.id === id;
            });
        }
        questions = methods_1.paginate(questions, params);
        questions = await async_calls_1.countQuestionsUpvotes(questions);
        return questions.data;
    }
    async findAllAnswers(params, id, year, month) {
        const user = await async_calls_1.getOneUser({ id });
        if (!user.data) {
            throw new common_1.NotFoundException(`User '${id}' not found.`);
        }
        const query_params = {
            id,
            owner: true,
            question: true,
            questionOwner: true,
        };
        let answers = await async_calls_1.getAnswers(query_params);
        answers = answers.data;
        if (year && month) {
            answers = answers.filter((answer) => {
                const date = new Date(answer.updated_at);
                return (answer.owner.id === id &&
                    date.getFullYear() === year &&
                    date.getMonth() === month);
            });
        }
        else if (year && !month) {
            answers = answers.filter((answer) => {
                const date = new Date(answer.updated_at);
                return (answer.owner.id === id &&
                    date.getFullYear() === year);
            });
        }
        else {
            answers = answers.filter((answer) => {
                return answer.owner.id === id;
            });
        }
        answers = methods_1.paginate(answers, params);
        answers = await async_calls_1.countAnswersAndQuestionsUpvotes(answers);
        return answers.data;
    }
    async findAllAnsweredQuestions(params, id, year, month) {
        const user = await async_calls_1.getOneUser({ id });
        if (!user.data) {
            throw new common_1.NotFoundException(`User ${id} not found.`);
        }
        const query_params = {
            year,
            month,
        };
        let questions = await async_calls_1.getUserAnswered(id, query_params);
        console.log(questions.data);
        questions = methods_1.paginate(questions.data, params);
        questions = await async_calls_1.countQuestionsUpvotes(questions);
        questions = questions.data;
        for (let i = 0; i < questions.length; i++) {
            questions[i]['owner'] = {
                id: questions[i].ownerid,
                email: questions[i].email,
                username: questions[i].username,
                points: questions[i].points,
            };
            delete questions[i].ownerid;
            delete questions[i].email;
            delete questions[i].username;
            delete questions[i].points;
        }
        return questions;
    }
    async findQuestionsStatsMonthly(id) {
        const user = await async_calls_1.getOneUser({ id });
        if (!user.data) {
            throw new common_1.NotFoundException(`User '${id}' not found.`);
        }
        const data = await async_calls_1.getUserQuestionsStatsMonthly(id);
        return methods_1.monthlyCountsParseInt(data.data, 'questions');
    }
    async findAnswersStatsMonthly(id) {
        const user = await async_calls_1.getOneUser({ id });
        if (!user.data) {
            throw new common_1.NotFoundException(`User '${id}' not found.`);
        }
        const data = await async_calls_1.getUserAnswersStatsMonthly(id);
        return methods_1.monthlyCountsParseInt(data.data, 'answers');
    }
    async findQuestionsStatsDaily(id) {
        const user = await async_calls_1.getOneUser({ id });
        if (!user.data) {
            throw new common_1.NotFoundException(`User '${id}' not found.`);
        }
        const data = await async_calls_1.getUserQuestionsStatsDaily(id);
        return methods_1.daysComplete(data.data, 'questions');
    }
    async findAnswersStatsDaily(id) {
        const user = await async_calls_1.getOneUser({ id });
        if (!user.data) {
            throw new common_1.NotFoundException(`User '${id}' not found.`);
        }
        const data = await async_calls_1.getUserAnswersStatsDaily(id);
        return methods_1.daysComplete(data.data, 'answers');
    }
    async ranking(req, params) {
        let user_id = null;
        let position = null;
        try {
            user_id = await methods_1.verify(req);
        }
        catch (_a) {
            ;
        }
        let users = await async_calls_1.getRanking();
        users = users.data;
        if (user_id) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id === user_id) {
                    position = i + 1;
                    break;
                }
            }
        }
        return {
            ranking: methods_1.paginate(users, params),
            position: position,
        };
    }
    async findAnsweredStatsMonthly(id) {
        const user = await async_calls_1.getOneUser({ id });
        if (!user.data) {
            throw new common_1.NotFoundException(`User '${id}' not found.`);
        }
        const data = await async_calls_1.getUserAnsweredStatsMonthly(id);
        return methods_1.monthlyCountsParseInt(data.data, 'answered');
    }
    async findAnsweredStatsDaily(id) {
        const user = await async_calls_1.getOneUser({ id });
        if (!user.data) {
            throw new common_1.NotFoundException(`User '${id}' not found.`);
        }
        const data = await async_calls_1.getUserAnsweredStatsDaily(id);
        return methods_1.daysComplete(data.data, 'answered');
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map