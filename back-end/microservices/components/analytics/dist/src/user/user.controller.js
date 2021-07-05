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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findUsersQuestionsMonthly(reqParams, id, year, month) {
        return this.userService.findAllQuestions(reqParams, id, year, month - 1);
    }
    findUsersQuestionsYearly(reqParams, id, year) {
        return this.userService.findAllQuestions(reqParams, id, year, null);
    }
    findUsersQuestions(reqParams, id) {
        return this.userService.findAllQuestions(reqParams, id, null, null);
    }
    findUsersAnswersMonthly(reqParams, id, year, month) {
        return this.userService.findAllAnswers(reqParams, id, year, month - 1);
    }
    findUsersAnswersYearly(reqParams, id, year) {
        return this.userService.findAllAnswers(reqParams, id, year, null);
    }
    findUsersAnswers(reqParams, id) {
        return this.userService.findAllAnswers(reqParams, id, null, null);
    }
    findUsersAnsweredMonthly(reqParams, id, year, month) {
        return this.userService.findAllAnsweredQuestions(reqParams, id, year, month);
    }
    findUsersAnsweredYearly(reqParams, id, year) {
        return this.userService.findAllAnsweredQuestions(reqParams, id, year, null);
    }
    findUsersAnswered(reqParams, id) {
        return this.userService.findAllAnsweredQuestions(reqParams, id, null, null);
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
], UserController.prototype, "findUsersQuestionsMonthly", null);
__decorate([
    common_1.Get(':id/questions/yearly/:year'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __param(2, common_1.Param('year', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUsersQuestionsYearly", null);
__decorate([
    common_1.Get(':id/questions'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUsersQuestions", null);
__decorate([
    common_1.Get(':id/answers/monthly/:year/:month'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __param(2, common_1.Param('year', common_1.ParseIntPipe)),
    __param(3, common_1.Param('month', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUsersAnswersMonthly", null);
__decorate([
    common_1.Get(':id/answers/yearly/:year/'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __param(2, common_1.Param('year', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUsersAnswersYearly", null);
__decorate([
    common_1.Get(':id/answers'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUsersAnswers", null);
__decorate([
    common_1.Get(':id/answered/monthly/:year/:month'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __param(2, common_1.Param('year', common_1.ParseIntPipe)),
    __param(3, common_1.Param('month', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUsersAnsweredMonthly", null);
__decorate([
    common_1.Get(':id/answered/yearly/:year'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __param(2, common_1.Param('year', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUsersAnsweredYearly", null);
__decorate([
    common_1.Get(':id/answered'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUsersAnswered", null);
UserController = __decorate([
    common_1.Controller('users'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map