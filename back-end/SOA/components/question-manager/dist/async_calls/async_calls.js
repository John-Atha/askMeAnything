"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogged = exports.answerIsUpvoted = exports.getAnswerUpvotes = exports.getOneAnswer = exports.createKeyword = exports.questionIsUpvoted = exports.deAttachQuestionKeywords = exports.attachQuestionKeywords = exports.getAllKeywords = exports.getOneKeyword = exports.answerCountUpvotes = exports.deleteQuestion = exports.updateQuestion = exports.createQuestion = exports.getOneUser = exports.getOneQuestion = void 0;
const create_keyword_dto_1 = require("../src/keyword/dto/create-keyword.dto");
const create_question_dto_1 = require("../src/question/dto/create-question.dto");
const update_question_dto_1 = require("../src/question/dto/update-question.dto");
const axios = require('axios');
const dataLayerUrl = 'https://askmeanything-soa-data-layer.herokuapp.com';
const EsbUrl = 'https://askmeanything-soa-esb.herokuapp.com';
const authUrl = 'https://askmeanything-soa-authenticate.herokuapp.com';
const getOneQuestion = (params) => {
    return axios.get(dataLayerUrl + `/questions/one`, { params });
};
exports.getOneQuestion = getOneQuestion;
const getOneUser = (params) => {
    return axios.get(dataLayerUrl + '/users/one', { params });
};
exports.getOneUser = getOneUser;
const createQuestion = (createQuestionDto, owner) => {
    return axios.post(dataLayerUrl + `/questions`, { createQuestionDto, owner });
};
exports.createQuestion = createQuestion;
const updateQuestion = (id, updateQuestionDto) => {
    return axios.patch(dataLayerUrl + `/questions/${id}`, updateQuestionDto);
};
exports.updateQuestion = updateQuestion;
const deleteQuestion = (id) => {
    return axios.delete(dataLayerUrl + `/questions/${id}`);
};
exports.deleteQuestion = deleteQuestion;
const answerCountUpvotes = (id) => {
    return axios.get(dataLayerUrl + `/questions/${id}/answers/count-upvotes`);
};
exports.answerCountUpvotes = answerCountUpvotes;
const getOneKeyword = (params) => {
    return axios.get(dataLayerUrl + `/keywords/one`, { params });
};
exports.getOneKeyword = getOneKeyword;
const getAllKeywords = () => {
    return axios.get(dataLayerUrl + `/keywords`);
};
exports.getAllKeywords = getAllKeywords;
const attachQuestionKeywords = (question_id, keyword_id) => {
    return axios.post(dataLayerUrl + `/questions/${question_id}/keywords/${keyword_id}`, {});
};
exports.attachQuestionKeywords = attachQuestionKeywords;
const deAttachQuestionKeywords = (question_id, keyword_id) => {
    return axios.delete(dataLayerUrl + `/questions/${question_id}/keywords/${keyword_id}`);
};
exports.deAttachQuestionKeywords = deAttachQuestionKeywords;
const questionIsUpvoted = (user_id, quest_id) => {
    return axios.get(dataLayerUrl + `/questions/${quest_id}/upvoted/${user_id}`);
};
exports.questionIsUpvoted = questionIsUpvoted;
const createKeyword = (createKeywordDto) => {
    return axios.post(dataLayerUrl + `/keywords`, createKeywordDto);
};
exports.createKeyword = createKeyword;
const getOneAnswer = (params) => {
    return axios.get(dataLayerUrl + `/answers/one`, { params });
};
exports.getOneAnswer = getOneAnswer;
const getAnswerUpvotes = (id) => {
    return axios.get(dataLayerUrl + `/answers/${id}/upvotes`);
};
exports.getAnswerUpvotes = getAnswerUpvotes;
const answerIsUpvoted = (user_id, answer_id) => {
    return axios.get(dataLayerUrl + `/answers/${answer_id}/upvoted/${user_id}`);
};
exports.answerIsUpvoted = answerIsUpvoted;
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