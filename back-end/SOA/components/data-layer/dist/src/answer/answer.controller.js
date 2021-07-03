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
const update_answer_dto_1 = require("./dto/update-answer.dto");
let AnswerController = class AnswerController {
    constructor(answerService) {
        this.answerService = answerService;
    }
    findOne(reqParams) {
        return this.answerService.findOne(reqParams);
    }
    find(reqParams) {
        return this.answerService.find(reqParams);
    }
    countUpvotes(body) {
        return this.answerService.answersAndQuestionsCountUpvotes(body);
    }
    countUpvotesAnswersOnly(body) {
        return this.answerService.answersCountUpvotes(body);
    }
    findOneUpvotes(id) {
        return this.answerService.findOneUpvotes(id);
    }
    IsUpvoted(answer_id, user_id) {
        return this.answerService.isUpvoted(answer_id, user_id);
    }
    create(body) {
        return this.answerService.create(body);
    }
    update(id, updateAnswerDto) {
        return this.answerService.update(id, updateAnswerDto);
    }
    remove(id) {
        return this.answerService.remove(id);
    }
    findAnswersStatsMonthly() {
        return this.answerService.findStatsMonthly();
    }
    findAnswersStatsDaily(id) {
        return this.answerService.findStatsDaily();
    }
};
__decorate([
    common_1.Get('one'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findOne", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "find", null);
__decorate([
    common_1.Post('count-ups'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "countUpvotes", null);
__decorate([
    common_1.Post('count-ups-only'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "countUpvotesAnswersOnly", null);
__decorate([
    common_1.Get(':id/upvotes'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findOneUpvotes", null);
__decorate([
    common_1.Get(':answer_id/upvoted/:user_id'),
    __param(0, common_1.Param('answer_id', common_1.ParseIntPipe)),
    __param(1, common_1.Param('user_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "IsUpvoted", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "create", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_answer_dto_1.UpdateAnswerDto]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "remove", null);
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
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [answer_service_1.AnswerService])
], AnswerController);
exports.AnswerController = AnswerController;
//# sourceMappingURL=answer.controller.js.map