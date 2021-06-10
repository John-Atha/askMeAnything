const axios = require('axios');
const dataLayerUrl = 'http://localhost:3006';
const EsbUrl = 'http://localhost:3007';
const authUrl = 'http://localhost:3002';

export const getOneUser = (params) => {
    return axios.get(dataLayerUrl+`/users/one`, { params });
}

export const getOneKeyword = (params) => {
    return axios.get(dataLayerUrl+`/keywords/one`, { params });
}

export const getUserQuestionsStatsMonthly = (id: number) => {
    return axios.get(dataLayerUrl+`/users/${id}/questions/stats/monthly`);
}

export const getUserAnswersStatsMonthly = (id: number) => {
    return axios.get(dataLayerUrl+`/users/${id}/answers/stats/monthly`);
}

export const getUserQuestionsStatsDaily = (id: number) => {
    return axios.get(dataLayerUrl+`/users/${id}/questions/stats/daily`);
}

export const getUserAnswersStatsDaily = (id: number) => {
    return axios.get(dataLayerUrl+`/users/${id}/answers/stats/daily`);
}

export const getRanking = () => {
    return axios.get(dataLayerUrl+`/users/ranking`);
}

export const getUserAnsweredStatsDaily = (id: number) => {
    return axios.get(dataLayerUrl+`/users/${id}/answered/stats/daily`);
}

export const getUserAnsweredStatsMonthly = (id: number) => {
    return axios.get(dataLayerUrl+`/users/${id}/answered/stats/monthly`);
}

export const getQuestionsStatsMonthly = () => {
    return axios.get(dataLayerUrl+`/questions/stats/monthly`);
}

export const getQuestionsStatsDaily = () => {
    return axios.get(dataLayerUrl+`/questions/stats/daily`);
}

export const getAnswersStatsMonthly = () => {
    return axios.get(dataLayerUrl+`/answers/stats/monthly`);
}

export const getAnswersStatsDaily = () => {
    return axios.get(dataLayerUrl+`/answers/stats/daily`);
}

export const getKeywordStatsMonthly = (id: number) => {
    return axios.get(dataLayerUrl+`/keywords/${id}/stats/monthly`);
}

export const getKeywordStatsDaily = (id: number) => {
    return axios.get(dataLayerUrl+`/keywords/${id}/stats/daily`);
}

export const isLogged = (token: any) => {
    const params = { 
        url: authUrl+`/users/logged`,
    };
    const headers = {
        "Authorization": `Bearer ${token}`,
    };
    //console.log(`get from ${params.url} with header ${headers.Authorization}`)
    return axios.post(EsbUrl, {}, { params, headers });
}
