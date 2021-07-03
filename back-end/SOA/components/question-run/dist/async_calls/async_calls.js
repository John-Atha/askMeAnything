"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogged = exports.deleteQuestionUpvote = exports.getOneQuestionUpvote = exports.createQuestionUpvote = exports.questionIsUpvoted = exports.answerIsUpvoted = exports.deleteAnswerUpvote = exports.getOneAnswerUpvote = exports.createAnswerUpvote = exports.deleteAnswer = exports.updAnswerText = exports.getOneAnswer = exports.createAnswer = exports.getOneQuestion = exports.getOneUser = void 0;
const create_answer_upvote_dto_1 = require("../src/answer-upvote/dto/create-answer-upvote.dto");
const create_answer_dto_1 = require("../src/answer/dto/create-answer.dto");
const axios = require('axios');
const dataLayerUrl = 'https://askmeanything-soa-data-layer.herokuapp.com';
const EsbUrl = 'https://askmeanything-soa-esb.herokuapp.com';
const authUrl = 'https://askmeanything-soa-authenticate.herokuapp.com';
const getOneUser = (params) => {
    return axios.get(dataLayerUrl + '/users/one', { params });
};
exports.getOneUser = getOneUser;
const getOneQuestion = (params) => {
    return axios.get(dataLayerUrl + `/questions/one`, { params });
};
exports.getOneQuestion = getOneQuestion;
const createAnswer = (createAnswerDto, question_id, owner_id) => {
    return axios.post(dataLayerUrl + `/answers`, { createAnswerDto, question_id, owner_id });
};
exports.createAnswer = createAnswer;
const getOneAnswer = (params) => {
    return axios.get(dataLayerUrl + `/answers/one`, { params });
};
exports.getOneAnswer = getOneAnswer;
const updAnswerText = (id, text) => {
    return axios.patch(dataLayerUrl + `/answers/${id}`, { text });
};
exports.updAnswerText = updAnswerText;
const deleteAnswer = (id) => {
    return axios.delete(dataLayerUrl + `/answers/${id}`);
};
exports.deleteAnswer = deleteAnswer;
const createAnswerUpvote = (createAnswerUpvoteDto) => {
    return axios.post(dataLayerUrl + `/answer-upvotes`, createAnswerUpvoteDto);
};
exports.createAnswerUpvote = createAnswerUpvote;
const getOneAnswerUpvote = (params) => {
    return axios.get(dataLayerUrl + `/answer-upvotes/one`, { params });
};
exports.getOneAnswerUpvote = getOneAnswerUpvote;
const deleteAnswerUpvote = (id) => {
    return axios.delete(dataLayerUrl + `/answer-upvotes/${id}`);
};
exports.deleteAnswerUpvote = deleteAnswerUpvote;
const answerIsUpvoted = (user_id, answer_id) => {
    return axios.get(dataLayerUrl + `/answers/${answer_id}/upvoted/${user_id}`);
};
exports.answerIsUpvoted = answerIsUpvoted;
const questionIsUpvoted = (user_id, quest_id) => {
    return axios.get(dataLayerUrl + `/questions/${quest_id}/upvoted/${user_id}`);
};
exports.questionIsUpvoted = questionIsUpvoted;
const createQuestionUpvote = (createQuestionUpvoteDto) => {
    return axios.post(dataLayerUrl + `/question-upvotes`, createQuestionUpvoteDto);
};
exports.createQuestionUpvote = createQuestionUpvote;
const getOneQuestionUpvote = (params) => {
    return axios.get(dataLayerUrl + `/question-upvotes/one`, { params });
};
exports.getOneQuestionUpvote = getOneQuestionUpvote;
const deleteQuestionUpvote = (id) => {
    return axios.delete(dataLayerUrl + `/question-upvotes/${id}`);
};
exports.deleteQuestionUpvote = deleteQuestionUpvote;
const isLogged = (token) => {
    const params = {
        url: authUrl + `/users/logged`,
    };
    const headers = {
        "Authorization": `Bearer ${token}`,
    };
    return axios.post(EsbUrl, {}, { params, headers });
};
exports.isLogged = isLogged;
//# sourceMappingURL=async_calls.js.map