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
exports.QuestionUpvoteController = void 0;
const common_1 = require("@nestjs/common");
const question_upvote_service_1 = require("./question-upvote.service");
const create_question_upvote_dto_1 = require("./dto/create-question-upvote.dto");
let QuestionUpvoteController = class QuestionUpvoteController {
    constructor(questionUpvoteService) {
        this.questionUpvoteService = questionUpvoteService;
    }
    create(req, createQuestionUpvoteDto) {
        return this.questionUpvoteService.create(req, createQuestionUpvoteDto);
    }
    remove(req, id) {
        return this.questionUpvoteService.remove(req, id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Request()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_question_upvote_dto_1.CreateQuestionUpvoteDto]),
    __metadata("design:returntype", void 0)
], QuestionUpvoteController.prototype, "create", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Request()), __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], QuestionUpvoteController.prototype, "remove", null);
QuestionUpvoteController = __decorate([
    common_1.Controller('question-upvotes'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [question_upvote_service_1.QuestionUpvoteService])
], QuestionUpvoteController);
exports.QuestionUpvoteController = QuestionUpvoteController;
//# sourceMappingURL=question-upvote.controller.js.map