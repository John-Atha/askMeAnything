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
exports.AnswerUpvoteController = void 0;
const common_1 = require("@nestjs/common");
const answer_upvote_service_1 = require("./answer-upvote.service");
const create_answer_upvote_dto_1 = require("./dto/create-answer-upvote.dto");
let AnswerUpvoteController = class AnswerUpvoteController {
    constructor(answerUpvoteService) {
        this.answerUpvoteService = answerUpvoteService;
    }
    create(req, createAnswerUpvoteDto) {
        return this.answerUpvoteService.create(req, createAnswerUpvoteDto);
    }
    remove(req, id) {
        return this.answerUpvoteService.remove(req, id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Request()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_answer_upvote_dto_1.CreateAnswerUpvoteDto]),
    __metadata("design:returntype", void 0)
], AnswerUpvoteController.prototype, "create", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Request()), __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AnswerUpvoteController.prototype, "remove", null);
AnswerUpvoteController = __decorate([
    common_1.Controller('answer-upvotes'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [answer_upvote_service_1.AnswerUpvoteService])
], AnswerUpvoteController);
exports.AnswerUpvoteController = AnswerUpvoteController;
//# sourceMappingURL=answer-upvote.controller.js.map