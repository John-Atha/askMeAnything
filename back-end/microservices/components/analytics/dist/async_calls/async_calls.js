"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countOneAnswerUpvotes = exports.countOneQuestionUpvotes = exports.getOneQuestion = exports.getOneUser = void 0;
const axios = require('axios');
const authMicroUrl = 'https://askmeanything-micro-auth.herokuapp.com';
const questionsMicroUrl = 'https://askmeanything-micro-questions.herokuapp.com';
const answersMicroUrl = 'https://askmeanything-micro-answers.herokuapp.com';
const getOneUser = (id) => {
    return axios.get(authMicroUrl + `/users/${id}`);
};
exports.getOneUser = getOneUser;
const getOneQuestion = (id) => {
    return axios.get(questionsMicroUrl + `/questions/${id}`);
};
exports.getOneQuestion = getOneQuestion;
const countOneQuestionUpvotes = (id) => {
    return axios.get(questionsMicroUrl + `/questions/${id}/upvotes/count`);
};
exports.countOneQuestionUpvotes = countOneQuestionUpvotes;
const countOneAnswerUpvotes = (id) => {
    return axios.get(answersMicroUrl + `/answers/${id}/upvotes/count`);
};
exports.countOneAnswerUpvotes = countOneAnswerUpvotes;
//# sourceMappingURL=async_calls.js.map