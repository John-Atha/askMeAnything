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
exports.KeywordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const methods_1 = require("../../general_methods/methods");
const keyword_entity_1 = require("./entities/keyword.entity");
let KeywordService = class KeywordService {
    constructor(manager) {
        this.manager = manager;
    }
    async findQuestionsMonthly(params, id, year, month) {
        return this.manager.transaction(async (manager) => {
            const keyword = await manager.findOne(keyword_entity_1.Keyword, id, {
                relations: ['questions', 'questions.owner'],
            });
            if (!keyword) {
                throw new common_1.NotFoundException(`Keyword '${id}' not found.`);
            }
            let questions = keyword.questions;
            questions = questions.filter((question) => {
                const date = new Date(question.updated_at);
                return (date.getFullYear() === year &&
                    date.getMonth() === month);
            });
            questions = methods_1.paginate(questions, params);
            questions = await methods_1.countQuestionsUpvotes(questions);
            questions = await methods_1.addNestedOwnerToObjList(questions);
            return questions;
        });
    }
    async findAll(params, id, year, month) {
        return this.manager.transaction(async (manager) => {
            const keyword = await manager.findOne(keyword_entity_1.Keyword, id, {
                relations: ['questions', 'questions.owner'],
            });
            if (!keyword) {
                throw new common_1.NotFoundException(`Keyword '${id}' not found.`);
            }
            let questions = keyword.questions;
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
            questions = await methods_1.countQuestionsUpvotes(questions);
            questions = await methods_1.addNestedOwnerToObjList(questions);
            return questions;
        });
    }
};
KeywordService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], KeywordService);
exports.KeywordService = KeywordService;
//# sourceMappingURL=keyword.service.js.map