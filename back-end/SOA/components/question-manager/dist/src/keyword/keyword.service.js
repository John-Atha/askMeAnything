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
exports.KeywordService = void 0;
const common_1 = require("@nestjs/common");
const methods_1 = require("../../general-methods/methods");
const async_calls_1 = require("../../async_calls/async_calls");
let KeywordService = class KeywordService {
    constructor() { }
    async create(req, createKeywordDto) {
        const user_id = await methods_1.verify(req);
        return async_calls_1.createKeyword(createKeywordDto)
            .then(response => { return response.data; })
            .catch(err => { throw new common_1.BadRequestException(err.response.data.message); });
    }
    async findAll(params) {
        const keywords = await async_calls_1.getAllKeywords();
        return methods_1.paginate(keywords.data, params);
    }
    async findOne(id) {
        const keyword = await async_calls_1.getOneKeyword({ id, questions: true });
        if (!keyword.data) {
            throw new common_1.NotFoundException(`Keyword '${id}' not found.`);
        }
        return keyword.data;
    }
};
KeywordService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], KeywordService);
exports.KeywordService = KeywordService;
//# sourceMappingURL=keyword.service.js.map