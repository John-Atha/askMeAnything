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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const methods_1 = require("../../general_methods/methods");
const typeorm_2 = require("typeorm");
const answer_entity_1 = require("./entities/answer.entity");
let AnswerService = class AnswerService {
    constructor(manager) {
        this.manager = manager;
    }
    async findAll(params, year, month) {
        return this.manager.transaction(async (manager) => {
            let answers = await manager.find(answer_entity_1.Answer, { relations: ['owner', 'question'] });
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
            answers = await methods_1.countAnswersUpvotes(answers);
            answers = await methods_1.addNestedOwnerToObjList(answers);
            answers = await methods_1.addNestedQuestionToObjList(answers);
            return answers;
        });
    }
};
AnswerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map