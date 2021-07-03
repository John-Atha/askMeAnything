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
exports.QuestionUpvote = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const question_entity_1 = require("../../question/entities/question.entity");
let QuestionUpvote = class QuestionUpvote {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], QuestionUpvote.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], QuestionUpvote.prototype, "created_at", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.question_upvotes, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], QuestionUpvote.prototype, "owner", void 0);
__decorate([
    typeorm_1.ManyToOne(() => question_entity_1.Question, (question) => question.upvotes, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", question_entity_1.Question)
], QuestionUpvote.prototype, "question", void 0);
QuestionUpvote = __decorate([
    typeorm_1.Entity()
], QuestionUpvote);
exports.QuestionUpvote = QuestionUpvote;
//# sourceMappingURL=question-upvote.entity.js.map