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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const methods_1 = require("../../general-methods/methods");
const async_calls_1 = require("../../async_calls/async_calls");
let AnswerService = class AnswerService {
    constructor() { }
    async findOneUpvotes(id, params) {
        const answer = await async_calls_1.getAnswerUpvotes(id);
        if (!answer.data) {
            throw new common_1.NotFoundException(`Answer '${id}' not found.`);
        }
        return methods_1.paginate(answer.data.upvotes, params);
    }
    async isUpvoted(id, req) {
        const user_id = await methods_1.verify(req);
        const answer = await async_calls_1.getOneAnswer({ id });
        if (!answer.data) {
            throw new common_1.NotFoundException(`Answer '${id}' not found.`);
        }
        const upvote = await async_calls_1.answerIsUpvoted(user_id, id);
        if (!upvote.data.length) {
            return {
                upvoted: false,
            };
        }
        return {
            upvoted: true,
            id: upvote.data[0].id,
        };
    }
    async findOne(id) {
        const answer = await async_calls_1.getOneAnswer({ id, owner: true });
        if (!answer.data) {
            throw new common_1.NotFoundException(`Answer ${id} not found.`);
        }
        return answer.data;
    }
};
AnswerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map