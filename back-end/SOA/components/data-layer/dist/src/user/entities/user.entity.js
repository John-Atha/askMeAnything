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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const question_entity_1 = require("../../question/entities/question.entity");
const answer_entity_1 = require("../../answer/entities/answer.entity");
const question_upvote_entity_1 = require("../../question-upvote/entities/question-upvote.entity");
const class_transformer_1 = require("class-transformer");
const answer_upvote_entity_1 = require("../../answer-upvote/entities/answer-upvote.entity");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    class_transformer_1.Exclude({ toPlainOnly: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "date_of_birth", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "points", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "site_url", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "github_username", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "member_since", void 0);
__decorate([
    typeorm_1.OneToMany((type) => question_entity_1.Question, (question) => question.owner),
    __metadata("design:type", Array)
], User.prototype, "questions", void 0);
__decorate([
    typeorm_1.OneToMany((type) => answer_entity_1.Answer, (answer) => answer.owner),
    __metadata("design:type", Array)
], User.prototype, "answers", void 0);
__decorate([
    typeorm_1.OneToMany((type) => question_upvote_entity_1.QuestionUpvote, (upvote) => upvote.owner),
    __metadata("design:type", Array)
], User.prototype, "question_upvotes", void 0);
__decorate([
    typeorm_1.OneToMany((type) => answer_upvote_entity_1.AnswerUpvote, (upvote) => upvote.owner),
    __metadata("design:type", Array)
], User.prototype, "answer_upvotes", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map