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
let KeywordController = class KeywordController {
    constructor(keywordService) {
        this.keywordService = keywordService;
    }
    findKeywordQuestionsMonthly(reqParams, id, year, month) {
        return this.keywordService.findAll(reqParams, id, year, month - 1);
    }
    findKeywordQuestionsYearly(reqParams, id, year) {
        return this.keywordService.findAll(reqParams, id, year, null);
    }
    findKeywordQuestionsAll(reqParams, id) {
        return this.keywordService.findAll(reqParams, id, null, null);
    }
};
__decorate([
    common_1.Get(':id/questions/monthly/:year/:month'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __param(2, common_1.Param('year', common_1.ParseIntPipe)),
    __param(3, common_1.Param('month', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number]),
    __metadata("design:returntype", void 0)
], KeywordController.prototype, "findKeywordQuestionsMonthly", null);
__decorate([
    common_1.Get(':id/questions/yearly/:year'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __param(2, common_1.Param('year', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], KeywordController.prototype, "findKeywordQuestionsYearly", null);
__decorate([
    common_1.Get(':id/questions'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], KeywordController.prototype, "findKeywordQuestionsAll", null);
KeywordController = __decorate([
    common_1.Controller('keywords'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [keyword_service_1.KeywordService])
], KeywordController);
exports.KeywordController = KeywordController;
//# sourceMappingURL=keyword.controller.js.map