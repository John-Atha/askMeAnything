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
    findUsersQuestionsStatsMonthly(id) {
        return this.userService.findQuestionsStatsMonthly(id);
    }
    findUsersQuestionsStatsDaily(id) {
        return this.userService.findQuestionsStatsDaily(id);
    }
    findUsersAnswersStatsMonthly(id) {
        return this.userService.findAnswersStatsMonthly(id);
    }
    findUsersAnswersStatsDaily(id) {
        return this.userService.findAnswersStatsDaily(id);
    }
    findUsersAnsweredStatsMonthly(id) {
        return this.userService.findAnsweredStatsMonthly(id);
    }
    findUsersAnsweredStatsDaily(id) {
        return this.userService.findAnsweredStatsDaily(id);
    }
};
__decorate([
    common_1.Get(':id/questions/stats/monthly'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUsersQuestionsStatsMonthly", null);
__decorate([
    common_1.Get(':id/questions/stats/daily'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUsersQuestionsStatsDaily", null);
__decorate([
    common_1.Get(':id/answers/stats/monthly'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUsersAnswersStatsMonthly", null);
__decorate([
    common_1.Get(':id/answers/stats/daily'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUsersAnswersStatsDaily", null);
__decorate([
    common_1.Get(':id/answered/stats/monthly'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUsersAnsweredStatsMonthly", null);
__decorate([
    common_1.Get(':id/answered/stats/daily'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUsersAnsweredStatsDaily", null);
UserController = __decorate([
    common_1.Controller('users'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map