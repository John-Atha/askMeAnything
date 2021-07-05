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
const typeorm_2 = require("typeorm");
const methods_1 = require("../../general_methods/methods");
const question_entity_1 = require("./entities/question.entity");
let QuestionService = class QuestionService {
    constructor(manager) {
        this.manager = manager;
    }
    async findAll(params, year, month) {
        return this.manager.transaction(async (manager) => {
            let questions = await this.manager.find(question_entity_1.Question, { relations: ['owner'] });
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
            questions = await methods_1.countQuestionsUpvotes(questions);
            questions = await methods_1.addNestedOwnerToObjList(questions);
            return questions;
        });
    }
};
QuestionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map