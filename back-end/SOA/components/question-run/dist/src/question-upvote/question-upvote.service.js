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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionUpvoteService = void 0;
const common_1 = require("@nestjs/common");
const methods_1 = require("../../general-methods/methods");
const async_calls_1 = require("../../async_calls/async_calls");
let QuestionUpvoteService = class QuestionUpvoteService {
    constructor() { }
    async create(req, createQuestionUpvoteDto) {
        const user_id = await methods_1.verify(req);
        createQuestionUpvoteDto['owner'] = {
            id: user_id,
        };
        return async_calls_1.createQuestionUpvote(createQuestionUpvoteDto)
            .then(response => { return response.data; })
            .catch(err => { throw new common_1.BadRequestException(err.response.data.message); });
    }
    async remove(req, id) {
        const user_id = await methods_1.verify(req);
        const params = {
            id,
            owner: true,
            question: true,
            questionOwner: true,
        };
        const upvote = await async_calls_1.getOneQuestionUpvote(params);
        if (!upvote.data) {
            throw new common_1.NotFoundException(`Upvote '${id}' not found.`);
        }
        if (user_id !== upvote.data.owner.id) {
            throw new common_1.BadRequestException(`You cannot delete another user's upvote.`);
        }
        return async_calls_1.deleteQuestionUpvote(id)
            .then(response => { return response.data; })
            .catch(err => { throw new common_1.BadRequestException(err.response.data.message); });
    }
};
QuestionUpvoteService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], QuestionUpvoteService);
exports.QuestionUpvoteService = QuestionUpvoteService;
//# sourceMappingURL=question-upvote.service.js.map