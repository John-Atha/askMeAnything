const axios = require('axios');
const dataLayerUrl = 'http://localhost:3006';

export const getOneUser = (params) => {
    return axios.get(dataLayerUrl+`/users/one`, { params });
}

export const getQuestionsStatsMonthly = (id: number) => {
    return axios.get(dataLayerUrl+`/users/${id}/questions/stats/monthly`);
}

export const getAnswersStatsMonthly = (id: number) => {
    return axios.get(dataLayerUrl+`/users/${id}/answers/stats/monthly`);
}

export const getQuestionsStatsDaily = (id: number) => {
    return axios.get(dataLayerUrl+`/users/${id}/questions/stats/daily`);
}

export const getAnswersStatsDaily = (id: number) => {
    return axios.get(dataLayerUrl+`/users/${id}/answers/stats/daily`);
}

export const getRanking = () => {
    return axios.get(dataLayerUrl+`/users/ranking`);
}

export const getAnsweredStatsDaily = (id: number) => {
    return axios.get(dataLayerUrl+`/users/${id}/answered/stats/daily`);
}

export const getAnsweredStatsMonthly = (id: number) => {
    return axios.get(dataLayerUrl+`/users/${id}/answered/stats/monthly`);
}