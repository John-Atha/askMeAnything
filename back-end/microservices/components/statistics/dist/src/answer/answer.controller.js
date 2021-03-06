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
exports.AnswerController = void 0;
const common_1 = require("@nestjs/common");
const answer_service_1 = require("./answer.service");
let AnswerController = class AnswerController {
    constructor(answerService) {
        this.answerService = answerService;
    }
    findAnswersStatsMonthly() {
        return this.answerService.findStatsMonthly();
    }
    findAnswersStatsDaily(id) {
        return this.answerService.findStatsDaily();
    }
};
__decorate([
    common_1.Get('stats/monthly'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findAnswersStatsMonthly", null);
__decorate([
    common_1.Get('stats/daily'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findAnswersStatsDaily", null);
AnswerController = __decorate([
    common_1.Controller('answers'),
    __metadata("design:paramtypes", [answer_service_1.AnswerService])
], AnswerController);
exports.AnswerController = AnswerController;
//# sourceMappingURL=answer.controller.js.map