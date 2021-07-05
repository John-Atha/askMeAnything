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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const methods_1 = require("../../general_methods/methods");
const question_entity_1 = require("../question/entities/question.entity");
const user_entity_1 = require("../user/entities/user.entity");
const answer_entity_1 = require("../answer/entities/answer.entity");
let UserService = class UserService {
    constructor(manager) {
        this.manager = manager;
    }
    async findAllQuestions(params, id, year, month) {
        return this.manager.transaction(async (manager) => {
            const user = await manager.findOne(user_entity_1.User, id);
            if (!user) {
                throw new common_1.NotFoundException(`User '${id}' not found.`);
            }
            let questions = await manager.find(question_entity_1.Question, { relations: ['owner'] });
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
            questions = await methods_1.addNestedOwnerToObjList(questions);
            questions = await methods_1.countQuestionsUpvotes(questions);
            return questions;
        });
    }
    async findAllAnswers(params, id, year, month) {
        return this.manager.transaction(async (manager) => {
            const user = await manager.findOne(user_entity_1.User, id);
            if (!user) {
                throw new common_1.NotFoundException(`User '${id}' not found.`);
            }
            let answers = await manager.find(answer_entity_1.Answer, {
                relations: ['owner', 'question', 'question.owner'],
            });
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
            answers = await methods_1.addNestedOwnerToObjList(answers);
            answers = await methods_1.addNestedQuestionToObjList(answers);
            answers = await methods_1.countAnswersUpvotes(answers);
            return answers;
        });
    }
    async findAllAnsweredQuestions(params, id, year, month) {
        return this.manager.transaction(async (manager) => {
            const user = await manager.findOne(user_entity_1.User, id);
            if (!user) {
                throw new common_1.NotFoundException(`User ${id} not found.`);
            }
            let questions = [];
            if (year && month) {
                if (month < 10)
                    month = '0' + month;
                questions = await this.manager.query(`SELECT DISTINCT public."question"."id",
                        public."question"."title",
                        public."question"."text",
                        public."question"."created_at",
                        public."question"."updated_at",
                        public."user"."id" as ownerId
                   FROM  public."answer", public."question", public."user"
                   WHERE public."answer"."ownerId"=${id}
                     AND public."user"."id"=${id}
                     AND public."question"."id"=public."answer"."questionId"
                     AND to_char(public."answer"."created_at", 'YYYY-MM')='${year}-${month}'`);
            }
            else if (year && !month) {
                questions = await this.manager.query(`SELECT DISTINCT public."question"."id",
                        public."question"."title",
                        public."question"."text",
                        public."question"."created_at",
                        public."question"."updated_at",
                        public."user"."id" as ownerId
                   FROM  public."answer", public."question", public."user"
                   WHERE public."answer"."ownerId"=${id}
                     AND public."user"."id"=${id}
                     AND public."question"."id"=public."answer"."questionId"
                     AND to_char(public."answer"."created_at", 'YYYY')='${year}'`);
            }
            else {
                questions = await this.manager.query(`SELECT DISTINCT public."question"."id",
                        public."question"."title",
                        public."question"."text",
                        public."question"."created_at",
                        public."question"."updated_at",
                        public."user"."id" as ownerId
                   FROM  public."answer", public."question", public."user"
                   WHERE public."answer"."ownerId"=${id}
                     AND public."user"."id"=${id}
                     AND public."question"."id"=public."answer"."questionId"`);
            }
            console.log(questions);
            questions = methods_1.paginate(questions, params);
            questions = await methods_1.countQuestionsUpvotes(questions);
            for (let i = 0; i < questions.length; i++) {
                questions[i]['owner'] = {
                    id: questions[i].ownerid,
                };
                delete questions[i].ownerid;
                questions[i] = await methods_1.addNestedOwnerToObj(questions[i], questions[i].owner.id);
            }
            return questions;
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map