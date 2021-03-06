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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    findQuestionsStatsMonthly() {
        return this.questionService.findStatsMonthly();
    }
    findQuestionsStatsDaily() {
        return this.questionService.findStatsDaily();
    }
};
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
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map