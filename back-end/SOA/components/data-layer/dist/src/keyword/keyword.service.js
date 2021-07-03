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
const keyword_entity_1 = require("./entities/keyword.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt = require('jsonwebtoken');
let KeywordService = class KeywordService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(createKeywordDto) {
        return this.manager.transaction(async (manager) => {
            const other = await manager.findOne(keyword_entity_1.Keyword, { name: createKeywordDto.name });
            if (other)
                throw new common_1.BadRequestException(`Keyword with this name already exists.`);
            const keyword = await manager.create(keyword_entity_1.Keyword, createKeywordDto);
            return manager.save(keyword);
        });
    }
    async findAll() {
        return this.manager.find(keyword_entity_1.Keyword);
    }
    async findOne(params) {
        console.log(params);
        let keyword = null;
        let relations = [];
        if (params.questions)
            relations.push('questions');
        if (params.questionsOwner)
            relations.push('questions.owner');
        if (params.id) {
            keyword = await this.manager.findOne(keyword_entity_1.Keyword, params.id, { relations });
        }
        else if (params.name) {
            keyword = await this.manager.findOne(keyword_entity_1.Keyword, { name: params.name }, { relations });
        }
        return keyword;
    }
    async validateCreate(name) {
        const keyword = await this.manager.find(keyword_entity_1.Keyword, { name: name });
        return !keyword.length;
    }
    async findStatsMonthly(id) {
        return this.manager.query(`SELECT to_char(public."question"."created_at", 'YYYY-MM') as month,
                    COUNT(*) as questions
             FROM public."question", public."question_keywords_keyword" 
             WHERE public."question_keywords_keyword"."keywordId"=${id}
               AND public."question_keywords_keyword"."questionId"=public."question"."id"
             GROUP BY month`);
    }
    async findStatsDaily(id) {
        return this.manager.query(`SELECT to_char(public."question"."created_at", 'FMDay') as day,
                    COUNT(*) as questions
             FROM public."question", public."question_keywords_keyword" 
             WHERE public."question_keywords_keyword"."keywordId"=${id}
               AND public."question_keywords_keyword"."questionId"=public."question"."id"
             GROUP BY day`);
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