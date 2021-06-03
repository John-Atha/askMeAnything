const axios = require('axios');
const dataLayerUrl = 'http://localhost:3006';

export const getOneQuestion = (params) => {
    return axios.get(dataLayerUrl+`/questions/one`, { params });
}

export const getQuestions = (params) => {
    return axios.get(dataLayerUrl+`/questions`, { params });
}

export const getOneUser = (params) => {
    return axios.get(dataLayerUrl+'/users/one', { params });
}

export const countQuestionsUpvotes = (questions) => {
    return axios.post(dataLayerUrl+`/questions/count-ups`, { questions });
}

export const getAnswers = (params) => {
    return axios.get(dataLayerUrl+`/answers`, { params });
}

export const countAnswersAndQuestionsUpvotes = (answers) => {
    return axios.post(dataLayerUrl+`/answers/count-ups`, { answers });
}

export const getUserAnswered = (id: number, params: any) => {
    return axios.get(dataLayerUrl+`/users/${id}/answered`, { params })
}