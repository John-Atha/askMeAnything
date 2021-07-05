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
const methods_1 = require("../../general_methods/methods");
const typeorm_2 = require("typeorm");
const keyword_entity_1 = require("./entities/keyword.entity");
let KeywordService = class KeywordService {
    constructor(manager) {
        this.manager = manager;
    }
    async findStatsMonthly(id) {
        return this.manager.transaction(async (manager) => {
            const keyword = await manager.findOne(keyword_entity_1.Keyword, id);
            if (!keyword) {
                throw new common_1.NotFoundException(`Keyword '${id}' not found.`);
            }
            const data = await manager.query(`SELECT to_char(public."question"."created_at", 'YYYY-MM') as month,
                      COUNT(*) as questions
               FROM public."question", public."question_keywords_keyword" 
               WHERE public."question_keywords_keyword"."keywordId"=${id}
                 AND public."question_keywords_keyword"."questionId"=public."question"."id"
               GROUP BY month`);
            return methods_1.monthlyCountsParseInt(data, 'questions');
        });
    }
    async findStatsDaily(id) {
        return this.manager.transaction(async (manager) => {
            const keyword = await manager.findOne(keyword_entity_1.Keyword, id);
            if (!keyword) {
                throw new common_1.NotFoundException(`Keyword '${id}' not found.`);
            }
            const data = await manager.query(`SELECT to_char(public."question"."created_at", 'FMDay') as day,
                      COUNT(*) as questions
               FROM public."question", public."question_keywords_keyword" 
               WHERE public."question_keywords_keyword"."keywordId"=${id}
                 AND public."question_keywords_keyword"."questionId"=public."question"."id"
               GROUP BY day`);
            return methods_1.daysComplete(data, 'questions');
        });
    }
    async findStats() {
        const data = await this.manager.query(`SELECT public."keyword"."name",
              COUNT(public."question_keywords_keyword"."questionId") as questions
       FROM   public."keyword",
              public."question_keywords_keyword"
       WHERE  public."keyword"."id" = public."question_keywords_keyword"."keywordId"
       GROUP BY public."keyword"."name"`);
        data.forEach(keyword => {
            keyword['questions'] = parseInt(keyword['questions']);
        });
        return data;
    }
};
KeywordService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], KeywordService);
exports.KeywordService = KeywordService;
//# sourceMappingURL=keyword.service.js.map