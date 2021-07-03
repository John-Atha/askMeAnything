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
const update_question_dto_1 = require("./dto/update-question.dto");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    create(body) {
        return this.questionService.create(body);
    }
    findOne(reqParams) {
        return this.questionService.findOne(reqParams);
    }
    find(reqParams) {
        return this.questionService.find(reqParams);
    }
    countUpvotes(body) {
        return this.questionService.questionsCountUpvotes(body);
    }
    update(id, updateQuestionDto) {
        return this.questionService.update(id, updateQuestionDto);
    }
    remove(id) {
        return this.questionService.remove(id);
    }
    AnswerCountUpvotes(id) {
        return this.questionService.AnswerCountUpvotes(id);
    }
    Upvotes(id) {
        return this.questionService.findUpvotes(id);
    }
    Upvoted(user_id, quest_id) {
        return this.questionService.isUpvoted(user_id, quest_id);
    }
    Keywords(id) {
        return this.questionService.findKeywords(id);
    }
    AttachKeyword(quest_id, keyword_id) {
        return this.questionService.updKeywords(quest_id, keyword_id, 'attach');
    }
    DeAttachKeyword(quest_id, keyword_id) {
        return this.questionService.updKeywords(quest_id, keyword_id, 'deattach');
    }
    findQuestionsStatsMonthly() {
        return this.questionService.findStatsMonthly();
    }
    findQuestionsStatsDaily() {
        return this.questionService.findStatsDaily();
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "create", null);
__decorate([
    common_1.Get('one'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findOne", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "find", null);
__decorate([
    common_1.Post('count-ups'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "countUpvotes", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_question_dto_1.UpdateQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "remove", null);
__decorate([
    common_1.Get(':id/answers/count-upvotes'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "AnswerCountUpvotes", null);
__decorate([
    common_1.Get(':id/upvotes'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "Upvotes", null);
__decorate([
    common_1.Get(':quest_id/upvoted/:user_id'),
    __param(0, common_1.Param('user_id', common_1.ParseIntPipe)),
    __param(1, common_1.Param('quest_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "Upvoted", null);
__decorate([
    common_1.Get(':id/keywords'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "Keywords", null);
__decorate([
    common_1.Post(':quest_id/keywords/:keyword_id'),
    __param(0, common_1.Param('quest_id', common_1.ParseIntPipe)),
    __param(1, common_1.Param('keyword_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "AttachKeyword", null);
__decorate([
    common_1.Delete(':quest_id/keywords/:keyword_id'),
    __param(0, common_1.Param('quest_id', common_1.ParseIntPipe)),
    __param(1, common_1.Param('keyword_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "DeAttachKeyword", null);
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