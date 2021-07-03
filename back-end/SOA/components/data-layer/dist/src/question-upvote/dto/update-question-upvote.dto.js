"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQuestionUpvoteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_question_upvote_dto_1 = require("./create-question-upvote.dto");
class UpdateQuestionUpvoteDto extends mapped_types_1.PartialType(create_question_upvote_dto_1.CreateQuestionUpvoteDto) {
}
exports.UpdateQuestionUpvoteDto = UpdateQuestionUpvoteDto;
//# sourceMappingURL=update-question-upvote.dto.js.map