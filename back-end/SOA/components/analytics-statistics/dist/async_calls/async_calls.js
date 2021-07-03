"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeywordsStats = exports.isLogged = exports.getKeywordStatsDaily = exports.getKeywordStatsMonthly = exports.getAnswersStatsDaily = exports.getAnswersStatsMonthly = exports.getQuestionsStatsDaily = exports.getQuestionsStatsMonthly = exports.getUserAnsweredStatsMonthly = exports.getUserAnsweredStatsDaily = exports.getRanking = exports.getUserAnswersStatsDaily = exports.getUserQuestionsStatsDaily = exports.getUserAnswersStatsMonthly = exports.getUserQuestionsStatsMonthly = exports.getOneKeyword = exports.getUserAnswered = exports.countAnswersUpvotes = exports.countAnswersAndQuestionsUpvotes = exports.getAnswers = exports.countQuestionsUpvotes = exports.getOneUser = exports.getQuestions = exports.getOneQuestion = void 0;
const axios = require('axios');
const dataLayerUrl = 'https://askmeanything-soa-data-layer.herokuapp.com';
const EsbUrl = 'https://askmeanything-soa-esb.herokuapp.com';
const authUrl = 'https://askmeanything-soa-authenticate.herokuapp.com';
const getOneQuestion = (params) => {
    return axios.get(dataLayerUrl + `/questions/one`, { params });
};
exports.getOneQuestion = getOneQuestion;
const getQuestions = (params) => {
    return axios.get(dataLayerUrl + `/questions`, { params });
};
exports.getQuestions = getQuestions;
const getOneUser = (params) => {
    return axios.get(dataLayerUrl + '/users/one', { params });
};
exports.getOneUser = getOneUser;
const countQuestionsUpvotes = (questions) => {
    return axios.post(dataLayerUrl + `/questions/count-ups`, { questions });
};
exports.countQuestionsUpvotes = countQuestionsUpvotes;
const getAnswers = (params) => {
    return axios.get(dataLayerUrl + `/answers`, { params });
};
exports.getAnswers = getAnswers;
const countAnswersAndQuestionsUpvotes = (answers) => {
    return axios.post(dataLayerUrl + `/answers/count-ups`, { answers });
};
exports.countAnswersAndQuestionsUpvotes = countAnswersAndQuestionsUpvotes;
const countAnswersUpvotes = (answers) => {
    return axios.post(dataLayerUrl + `/answers/count-ups-only`, { answers });
};
exports.countAnswersUpvotes = countAnswersUpvotes;
const getUserAnswered = (id, params) => {
    return axios.get(dataLayerUrl + `/users/${id}/answered`, { params });
};
exports.getUserAnswered = getUserAnswered;
const getOneKeyword = (params) => {
    return axios.get(dataLayerUrl + `/keywords/one`, { params });
};
exports.getOneKeyword = getOneKeyword;
const getUserQuestionsStatsMonthly = (id) => {
    return axios.get(dataLayerUrl + `/users/${id}/questions/stats/monthly`);
};
exports.getUserQuestionsStatsMonthly = getUserQuestionsStatsMonthly;
const getUserAnswersStatsMonthly = (id) => {
    return axios.get(dataLayerUrl + `/users/${id}/answers/stats/monthly`);
};
exports.getUserAnswersStatsMonthly = getUserAnswersStatsMonthly;
const getUserQuestionsStatsDaily = (id) => {
    return axios.get(dataLayerUrl + `/users/${id}/questions/stats/daily`);
};
exports.getUserQuestionsStatsDaily = getUserQuestionsStatsDaily;
const getUserAnswersStatsDaily = (id) => {
    return axios.get(dataLayerUrl + `/users/${id}/answers/stats/daily`);
};
exports.getUserAnswersStatsDaily = getUserAnswersStatsDaily;
const getRanking = () => {
    return axios.get(dataLayerUrl + `/users/ranking`);
};
exports.getRanking = getRanking;
const getUserAnsweredStatsDaily = (id) => {
    return axios.get(dataLayerUrl + `/users/${id}/answered/stats/daily`);
};
exports.getUserAnsweredStatsDaily = getUserAnsweredStatsDaily;
const getUserAnsweredStatsMonthly = (id) => {
    return axios.get(dataLayerUrl + `/users/${id}/answered/stats/monthly`);
};
exports.getUserAnsweredStatsMonthly = getUserAnsweredStatsMonthly;
const getQuestionsStatsMonthly = () => {
    return axios.get(dataLayerUrl + `/questions/stats/monthly`);
};
exports.getQuestionsStatsMonthly = getQuestionsStatsMonthly;
const getQuestionsStatsDaily = () => {
    return axios.get(dataLayerUrl + `/questions/stats/daily`);
};
exports.getQuestionsStatsDaily = getQuestionsStatsDaily;
const getAnswersStatsMonthly = () => {
    return axios.get(dataLayerUrl + `/answers/stats/monthly`);
};
exports.getAnswersStatsMonthly = getAnswersStatsMonthly;
const getAnswersStatsDaily = () => {
    return axios.get(dataLayerUrl + `/answers/stats/daily`);
};
exports.getAnswersStatsDaily = getAnswersStatsDaily;
const getKeywordStatsMonthly = (id) => {
    return axios.get(dataLayerUrl + `/keywords/${id}/stats/monthly`);
};
exports.getKeywordStatsMonthly = getKeywordStatsMonthly;
const getKeywordStatsDaily = (id) => {
    return axios.get(dataLayerUrl + `/keywords/${id}/stats/daily`);
};
exports.getKeywordStatsDaily = getKeywordStatsDaily;
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
const getKeywordsStats = () => {
    return axios.get(dataLayerUrl + `/keywords/stats`);
};
exports.getKeywordsStats = getKeywordsStats;
//# sourceMappingURL=async_calls.js.map