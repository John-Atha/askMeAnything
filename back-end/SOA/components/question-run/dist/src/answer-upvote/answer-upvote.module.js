"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerUpvoteModule = void 0;
const common_1 = require("@nestjs/common");
const answer_upvote_service_1 = require("./answer-upvote.service");
const answer_upvote_controller_1 = require("./answer-upvote.controller");
let AnswerUpvoteModule = class AnswerUpvoteModule {
};
AnswerUpvoteModule = __decorate([
    common_1.Module({
        controllers: [answer_upvote_controller_1.AnswerUpvoteController],
        providers: [answer_upvote_service_1.AnswerUpvoteService]
    })
], AnswerUpvoteModule);
exports.AnswerUpvoteModule = AnswerUpvoteModule;
//# sourceMappingURL=answer-upvote.module.js.map