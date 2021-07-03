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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    findMonthly(reqParams, year, month) {
        return this.questionService.findAll(reqParams, year, month - 1);
    }
    findYearly(reqParams, year) {
        return this.questionService.findAll(reqParams, year, null);
    }
    findAll(reqParams) {
        return this.questionService.findAll(reqParams, null, null);
    }
    findQuestionsStatsMonthly() {
        return this.questionService.findStatsMonthly();
    }
    findQuestionsStatsDaily() {
        return this.questionService.findStatsDaily();
    }
};
__decorate([
    common_1.Get('monthly/:year/:month'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param('year', common_1.ParseIntPipe)),
    __param(2, common_1.Param('month', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findMonthly", null);
__decorate([
    common_1.Get('yearly/:year'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param('year', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findYearly", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findAll", null);
__decorate([
    common_1.Get('/stats/monthly'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findQuestionsStatsMonthly", null);
__decorate([
    common_1.Get('/stats/daily'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findQuestionsStatsDaily", null);
QuestionController = __decorate([
    common_1.Controller('questions'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map