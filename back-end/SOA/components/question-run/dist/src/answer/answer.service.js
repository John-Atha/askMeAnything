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
    async create(req, createAnswerDto) {
        const user_id = await methods_1.verify(req);
        const question_id = createAnswerDto.question.id;
        const answer = await async_calls_1.createAnswer(createAnswerDto, question_id, user_id);
        return answer.data;
    }
    async update(req, id, updateAnswerDto) {
        const user_id = await methods_1.verify(req);
        const params = {
            id,
            owner: true,
        };
        const answer = await async_calls_1.getOneAnswer(params);
        if (!answer.data) {
            throw new common_1.NotFoundException(`Answer '${id}' not found.`);
        }
        if (user_id !== answer.data.owner.id) {
            throw new common_1.BadRequestException(`You cannot update another user's answer.`);
        }
        const text = updateAnswerDto.text;
        if (!text) {
            return answer.data;
        }
        const newAnswer = await async_calls_1.updAnswerText(id, text);
        return newAnswer.data;
    }
    async remove(req, id) {
        const user_id = await methods_1.verify(req);
        const answer = await async_calls_1.getOneAnswer({ id, owner: true });
        if (!answer.data) {
            throw new common_1.NotFoundException(`Answer '${id}' not found.`);
        }
        if (user_id !== answer.data.owner.id) {
            throw new common_1.BadRequestException(`You cannot delete another user's answer.`);
        }
        const res = await async_calls_1.deleteAnswer(id);
        return res.data;
    }
};
AnswerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map