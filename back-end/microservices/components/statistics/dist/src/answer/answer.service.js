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
let AnswerService = class AnswerService {
    constructor(manager) {
        this.manager = manager;
    }
    async findStatsMonthly() {
        const data = await this.manager.query(`SELECT to_char(public."answer"."created_at", 'YYYY-MM') as month,
                    COUNT(*) as answers
               FROM public."answer"
               GROUP BY month`);
        return methods_1.monthlyCountsParseInt(data, 'answers');
    }
    async findStatsDaily() {
        const data = await this.manager.query(`SELECT to_char(public."answer"."created_at", 'FMDay') as day,
                    COUNT(*) as answers
              FROM public."answer"
              GROUP BY day`);
        return methods_1.daysComplete(data, 'answers');
    }
};
AnswerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map