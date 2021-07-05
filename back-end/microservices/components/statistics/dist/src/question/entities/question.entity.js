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
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const answer_entity_1 = require("../../answer/entities/answer.entity");
const keyword_entity_1 = require("../../keyword/entities/keyword.entity");
let Question = class Question {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Question.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Question.prototype, "text", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Question.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Question.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.questions, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], Question.prototype, "owner", void 0);
__decorate([
    typeorm_1.OneToMany((type) => answer_entity_1.Answer, (answer) => answer.question),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => keyword_entity_1.Keyword, (keyword) => keyword.questions, {
        cascade: true,
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Question.prototype, "keywords", void 0);
Question = __decorate([
    typeorm_1.Entity()
], Question);
exports.Question = Question;
//# sourceMappingURL=question.entity.js.map