"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionUpvoteModule = void 0;
const common_1 = require("@nestjs/common");
const question_upvote_service_1 = require("./question-upvote.service");
const question_upvote_controller_1 = require("./question-upvote.controller");
const typeorm_1 = require("@nestjs/typeorm");
const question_upvote_entity_1 = require("./entities/question-upvote.entity");
let QuestionUpvoteModule = class QuestionUpvoteModule {
};
QuestionUpvoteModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([question_upvote_entity_1.QuestionUpvote])],
        controllers: [question_upvote_controller_1.QuestionUpvoteController],
        providers: [question_upvote_service_1.QuestionUpvoteService],
    })
], QuestionUpvoteModule);
exports.QuestionUpvoteModule = QuestionUpvoteModule;
//# sourceMappingURL=question-upvote.module.js.map