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
let AnswerUpvoteController = class AnswerUpvoteController {
    constructor(answerUpvoteService) {
        this.answerUpvoteService = answerUpvoteService;
    }
    create(createAnswerUpvoteDto) {
        return this.answerUpvoteService.create(createAnswerUpvoteDto);
    }
    remove(id) {
        return this.answerUpvoteService.remove(id);
    }
    findOne(reqParams) {
        return this.answerUpvoteService.findOne(reqParams);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnswerUpvoteController.prototype, "create", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnswerUpvoteController.prototype, "remove", null);
__decorate([
    common_1.Get('one'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnswerUpvoteController.prototype, "findOne", null);
AnswerUpvoteController = __decorate([
    common_1.Controller('answer-upvotes'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [answer_upvote_service_1.AnswerUpvoteService])
], AnswerUpvoteController);
exports.AnswerUpvoteController = AnswerUpvoteController;
//# sourceMappingURL=answer-upvote.controller.js.map