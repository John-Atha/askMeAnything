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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const methods_1 = require("../../general_methods/methods");
const question_entity_1 = require("../question/entities/question.entity");
const user_entity_1 = require("../user/entities/user.entity");
const question_upvote_entity_1 = require("../question-upvote/entities/question-upvote.entity");
const keyword_entity_1 = require("../keyword/entities/keyword.entity");
const async_calls_1 = require("../../async_calls/async_calls");
let QuestionService = class QuestionService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(req, createQuestionDto) {
        return this.manager.transaction(async (manager) => {
            const user_id = await methods_1.verify(req);
            console.log(`I see user ${user_id}`);
            const allowed = await this.validateCreate(createQuestionDto.title);
            if (!allowed) {
                throw new common_1.BadRequestException('Title already exists.');
            }
            const owner = await manager.findOne(user_entity_1.User, user_id);
            if (!owner) {
                throw new common_1.UnauthorizedException();
            }
            createQuestionDto['owner'] = {
                id: user_id,
            };
            const question = await manager.create(question_entity_1.Question, createQuestionDto);
            question.owner = owner;
            const newQuest = await manager.save(question);
            async_calls_1.choreoPost('post', newQuest, -1, 'question')
                .then(response => {
                console.log(response.data);
            })
                .catch(err => {
                console.log(err);
            });
            return methods_1.addNestedOwnerToObj(newQuest, user_id);
        });
    }
    async findOne(id) {
        const question = await this.manager.findOne(question_entity_1.Question, id, {
            relations: ['owner', 'upvotes'],
        });
        if (!question) {
            throw new common_1.NotFoundException(`Question '${id}' not found.`);
        }
        const count = await this.manager.query(`SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${id}`);
        question['upvotesCount'] = await parseInt(count[0]['count']);
        return methods_1.addNestedOwnerToObj(question, question.owner.id);
    }
    async countUpvotes(id) {
        const question = await this.manager.findOne(question_entity_1.Question, id);
        if (!question) {
            throw new common_1.NotFoundException(`Question '${id}' not found.`);
        }
        let count = await this.manager.query(`SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${id}`);
        count = await parseInt(count[0]['count']);
        return { upvotes: count };
    }
    async update(req, id, updateQuestionDto) {
        return this.manager.transaction(async (manager) => {
            const user_id = await methods_1.verify(req);
            const allowed = await this.validateUpdate(id, updateQuestionDto.title);
            if (!allowed) {
                throw new common_1.BadRequestException('Title already exists.');
            }
            const question = await manager.findOne(question_entity_1.Question, id, {
                relations: ['owner'],
            });
            if (!question) {
                throw new common_1.NotFoundException(`Question ${id} not found.`);
            }
            console.log(question);
            if (question.owner.id !== user_id) {
                throw new common_1.BadRequestException("You cannot update another user's question");
            }
            manager.merge(question_entity_1.Question, question, updateQuestionDto);
            const newQuest = await manager.save(question);
            async_calls_1.choreoPost('patch', newQuest, id, 'question')
                .then(response => {
                console.log(response.data);
            })
                .catch(err => {
                console.log(err);
            });
            return methods_1.addNestedOwnerToObj(newQuest, user_id);
        });
    }
    async remove(req, id) {
        return this.manager.transaction(async (manager) => {
            const user_id = await methods_1.verify(req);
            const question = await manager.findOne(question_entity_1.Question, id, {
                relations: ['owner'],
            });
            if (!question) {
                throw new common_1.NotFoundException(`Question ${id} not found.`);
            }
            if (question.owner.id !== user_id) {
                throw new common_1.BadRequestException("You cannot delete another user's question.");
            }
            const res = await manager.delete(question_entity_1.Question, id);
            async_calls_1.choreoPost('delete', { id }, id, 'question')
                .then(response => {
                console.log(response.data);
            })
                .catch(err => {
                console.log(err);
            });
            return res;
        });
    }
    async findUpvotes(id, reqParams) {
        const question = await this.manager.findOne(question_entity_1.Question, id, { relations: ['upvotes', 'upvotes.owner'] });
        if (!question) {
            throw new common_1.NotFoundException(`Question ${id} not found.`);
        }
        for (let i = 0; i < question.upvotes.length; i++) {
            const upvote = question.upvotes[i];
            const owner_id = upvote.owner.id;
            question.upvotes[i] = await methods_1.addNestedOwnerToObj(upvote, owner_id);
        }
        return methods_1.paginate(question.upvotes, reqParams);
    }
    async isUpvoted(req, id) {
        return this.manager.transaction(async (manager) => {
            const user_id = await methods_1.verify(req);
            const user = await manager.findOne(user_entity_1.User, user_id);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            const question = await manager.findOne(question_entity_1.Question, id);
            if (!question) {
                throw new common_1.NotFoundException(`Question ${id} not found.`);
            }
            const upvote = await manager.find(question_upvote_entity_1.QuestionUpvote, { owner: user, question: question });
            if (!upvote.length) {
                return {
                    upvoted: false,
                };
            }
            return {
                upvoted: true,
                id: upvote[0].id,
            };
        });
    }
    async findKeywords(id) {
        const question = await this.manager.findOne(question_entity_1.Question, id, { relations: ['keywords'] });
        if (!question) {
            throw new common_1.NotFoundException(`Question '${id}' not found.`);
        }
        return question.keywords;
    }
    async attachKeyword(req, question_id, keyword_id) {
        return this.manager.transaction(async (manager) => {
            const user_id = await methods_1.verify(req);
            const user = await manager.findOne(user_entity_1.User, user_id);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            const question = await manager.findOne(question_entity_1.Question, question_id, { relations: ['owner', 'keywords'] });
            if (!question) {
                throw new common_1.NotFoundException(`Question '${question_id} not found.`);
            }
            if (question.owner.id !== user.id) {
                console.log(question.owner);
                console.log(user);
                throw new common_1.BadRequestException(`Only the question's owner can modify it.`);
            }
            const keyword = await manager.findOne(keyword_entity_1.Keyword, keyword_id);
            if (!keyword) {
                throw new common_1.NotFoundException(`Keyword '${keyword_id} not found.`);
            }
            const old_keywords = question.keywords;
            console.log(old_keywords);
            console.log(keyword);
            let already_in = false;
            for (let i = 0; i < old_keywords.length; i++) {
                if (old_keywords[i].id === keyword.id) {
                    already_in = true;
                }
            }
            if (!already_in) {
                console.log('New, I am adding it.');
                old_keywords.push(keyword);
            }
            question.keywords = old_keywords;
            const newQuest = await manager.save(question);
            async_calls_1.choreoPost('patch', old_keywords, question_id, 'question-keywords')
                .then(response => {
                console.log(response.data);
            })
                .catch(err => {
                console.log(err);
            });
            return methods_1.addNestedOwnerToObj(newQuest, user_id);
        });
    }
    async detachKeyword(req, question_id, keyword_id) {
        return this.manager.transaction(async (manager) => {
            const user_id = await methods_1.verify(req);
            const user = await manager.findOne(user_entity_1.User, user_id);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            const question = await manager.findOne(question_entity_1.Question, question_id, { relations: ['owner', 'keywords'] });
            if (!question) {
                throw new common_1.NotFoundException(`Question '${question_id} not found.`);
            }
            if (question.owner.id !== user_id) {
                console.log(question.owner.id);
                console.log(user_id);
                throw new common_1.BadRequestException(`Only the question's owner can modify it.`);
            }
            const keyword = await manager.findOne(keyword_entity_1.Keyword, keyword_id);
            if (!keyword) {
                throw new common_1.NotFoundException(`Keyword '${keyword_id} not found.`);
            }
            const keywordsIds = [];
            question.keywords.forEach((word) => {
                keywordsIds.push(word.id);
            });
            let index = -1;
            for (let i = 0; i < question.keywords.length; i++) {
                if (question.keywords[i].id === keyword.id) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                question.keywords = question.keywords
                    .slice(0, index)
                    .concat(question.keywords.slice(index + 1, question.keywords.length));
                const newQuestion = await this.manager.save(question);
                async_calls_1.choreoPost('patch', question.keywords, question_id, 'question-keywords')
                    .then(response => {
                    console.log(response.data);
                })
                    .catch(err => {
                    console.log(err);
                });
                return methods_1.addNestedOwnerToObj(newQuestion, user_id);
            }
            else {
                throw new common_1.BadRequestException(`Keyword '${keyword_id}' not in question '${question_id}'`);
            }
        });
    }
    async validateCreate(title) {
        const res = await this.manager.find(question_entity_1.Question, { title: title });
        return !res.length;
    }
    async validateUpdate(id, title) {
        const res = await this.manager.findOne(question_entity_1.Question, { title: title });
        return !res || (res && res['id'] === id);
    }
};
QuestionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map