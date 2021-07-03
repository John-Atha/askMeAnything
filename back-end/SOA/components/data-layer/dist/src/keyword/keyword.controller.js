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
exports.KeywordController = void 0;
const common_1 = require("@nestjs/common");
const keyword_service_1 = require("./keyword.service");
const create_keyword_dto_1 = require("./dto/create-keyword.dto");
let KeywordController = class KeywordController {
    constructor(keywordService) {
        this.keywordService = keywordService;
    }
    create(createKeywordDto) {
        return this.keywordService.create(createKeywordDto);
    }
    findAll() {
        return this.keywordService.findAll();
    }
    findOne(reqParams) {
        return this.keywordService.findOne(reqParams);
    }
    findKeywordsStatsMonthly(id) {
        return this.keywordService.findStatsMonthly(id);
    }
    findKeywordsStatsDaily(id) {
        return this.keywordService.findStatsDaily(id);
    }
    findKeywordsStats() {
        return this.keywordService.findStats();
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_keyword_dto_1.CreateKeywordDto]),
    __metadata("design:returntype", void 0)
], KeywordController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KeywordController.prototype, "findAll", null);
__decorate([
    common_1.Get('one'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], KeywordController.prototype, "findOne", null);
__decorate([
    common_1.Get(':id/stats/monthly'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], KeywordController.prototype, "findKeywordsStatsMonthly", null);
__decorate([
    common_1.Get(':id/stats/daily'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], KeywordController.prototype, "findKeywordsStatsDaily", null);
__decorate([
    common_1.Get('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KeywordController.prototype, "findKeywordsStats", null);
KeywordController = __decorate([
    common_1.Controller('keywords'),
    __metadata("design:paramtypes", [keyword_service_1.KeywordService])
], KeywordController);
exports.KeywordController = KeywordController;
//# sourceMappingURL=keyword.controller.js.map