"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const question_module_1 = require("./question/question.module");
const answer_module_1 = require("./answer/answer.module");
const keyword_module_1 = require("./keyword/keyword.module");
const question_upvote_module_1 = require("./question-upvote/question-upvote.module");
const answer_upvote_module_1 = require("./answer-upvote/answer-upvote.module");
const typeorm_1 = require("@nestjs/typeorm");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                keepConnectionAlive: true,
            }),
            user_module_1.UserModule,
            question_module_1.QuestionModule,
            answer_module_1.AnswerModule,
            keyword_module_1.KeywordModule,
            question_upvote_module_1.QuestionUpvoteModule,
            answer_upvote_module_1.AnswerUpvoteModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map