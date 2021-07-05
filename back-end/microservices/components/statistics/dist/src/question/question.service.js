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
let QuestionService = class QuestionService {
    constructor(manager) {
        this.manager = manager;
    }
    async findStatsMonthly() {
        const data = await this.manager.query(`SELECT to_char(public."question"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as questions
               FROM public."question"
               GROUP BY month`);
        return methods_1.monthlyCountsParseInt(data, 'questions');
    }
    async findStatsDaily() {
        const data = await this.manager.query(`SELECT to_char(public."question"."created_at", 'FMDay') as day,
                    COUNT(*) as questions
              FROM public."question"
              GROUP BY day`);
        return methods_1.daysComplete(data, 'questions');
    }
};
QuestionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map