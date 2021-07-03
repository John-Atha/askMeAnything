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
exports.AnswerUpvote = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const answer_entity_1 = require("../../answer/entities/answer.entity");
let AnswerUpvote = class AnswerUpvote {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AnswerUpvote.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], AnswerUpvote.prototype, "created_at", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.answer_upvotes, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], AnswerUpvote.prototype, "owner", void 0);
__decorate([
    typeorm_1.ManyToOne(() => answer_entity_1.Answer, (answer) => answer.upvotes, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", answer_entity_1.Answer)
], AnswerUpvote.prototype, "answer", void 0);
AnswerUpvote = __decorate([
    typeorm_1.Entity()
], AnswerUpvote);
exports.AnswerUpvote = AnswerUpvote;
//# sourceMappingURL=answer-upvote.entity.js.map