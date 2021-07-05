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
const async_calls_1 = require("../../async_calls/async_calls");
const jwt = require('jsonwebtoken');
let KeywordService = class KeywordService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(req, createKeywordDto) {
        return this.manager.transaction(async (manager) => {
            const user_id = await methods_1.verify(req);
            const allowed = await this.validateCreate(createKeywordDto.name);
            console.log(allowed);
            if (!allowed) {
                throw new common_1.BadRequestException(`Keyword '${createKeywordDto.name}' already exists.`);
            }
            const keyword = await manager.create(keyword_entity_1.Keyword, createKeywordDto);
            const res = await manager.save(keyword);
            async_calls_1.choreoPost('post', res, -1, 'keyword')
                .then(response => {
                console.log(response.data);
            })
                .catch(err => {
                console.log(err);
            });
            return res;
        });
    }
    async findAll(params) {
        const keywords = await this.manager.find(keyword_entity_1.Keyword);
        return methods_1.paginate(keywords, params);
    }
    async findOne(id) {
        const keyword = await this.manager.findOne(keyword_entity_1.Keyword, id, { relations: ['questions'] });
        if (!keyword) {
            throw new common_1.NotFoundException(`Keyword '${id}' not found.`);
        }
        return keyword;
    }
    async validateCreate(name) {
        const keyword = await this.manager.find(keyword_entity_1.Keyword, { name });
        return !keyword.length;
    }
};
KeywordService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], KeywordService);
exports.KeywordService = KeywordService;
//# sourceMappingURL=keyword.service.js.map