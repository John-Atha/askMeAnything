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
const create_question_dto_1 = require("./dto/create-question.dto");
const update_question_dto_1 = require("./dto/update-question.dto");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    create(req, createQuestionDto) {
        return this.questionService.create(req, createQuestionDto);
    }
    findOne(id) {
        return this.questionService.findOne(id);
    }
    remove(req, id) {
        return this.questionService.remove(req, id);
    }
    update(req, id, updateQuestionDto) {
        return this.questionService.update(req, id, updateQuestionDto);
    }
    Upvotes(reqParams, id) {
        return this.questionService.findUpvotes(id, reqParams);
    }
    UpvotesCount(id) {
        return this.questionService.countUpvotes(id);
    }
    Upvoted(req, id) {
        return this.questionService.isUpvoted(req, id);
    }
    Keywords(id) {
        return this.questionService.findKeywords(id);
    }
    AttachKeyword(req, quest_id, key_id) {
        return this.questionService.attachKeyword(req, quest_id, key_id);
    }
    DetachKeyword(req, quest_id, key_id) {
        return this.questionService.detachKeyword(req, quest_id, key_id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Request()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_question_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "create", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findOne", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Request()), __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "remove", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_question_dto_1.UpdateQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "update", null);
__decorate([
    common_1.Get(':id/upvotes'),
    __param(0, common_1.Query()), __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "Upvotes", null);
__decorate([
    common_1.Get(':id/upvotes/count'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "UpvotesCount", null);
__decorate([
    common_1.Get(':id/upvoted'),
    __param(0, common_1.Request()), __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
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
    common_1.Post(':quest_id/keywords/:key_id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('quest_id', common_1.ParseIntPipe)),
    __param(2, common_1.Param('key_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "AttachKeyword", null);
__decorate([
    common_1.Delete(':quest_id/keywords/:key_id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('quest_id', common_1.ParseIntPipe)),
    __param(2, common_1.Param('key_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "DetachKeyword", null);
QuestionController = __decorate([
    common_1.Controller('questions'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map