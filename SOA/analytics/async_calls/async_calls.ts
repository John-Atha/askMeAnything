const axios = require('axios');
const dataLayerUrl = 'http://localhost:3006';

export const getOneQuestion = (params: any) => {
    return axios.get(dataLayerUrl+`/questions/one`, { params });
}

export const getQuestions = (params: any) => {
    return axios.get(dataLayerUrl+`/questions`, { params });
}

export const getOneUser = (params: any) => {
    return axios.get(dataLayerUrl+'/users/one', { params });
}

export const countQuestionsUpvotes = (questions: any) => {
    return axios.post(dataLayerUrl+`/questions/count-ups`, { questions });
}

export const getAnswers = (params: any) => {
    return axios.get(dataLayerUrl+`/answers`, { params });
}

export const countAnswersAndQuestionsUpvotes = (answers: any) => {
    return axios.post(dataLayerUrl+`/answers/count-ups`, { answers });
}

export const countAnswersUpvotes = (answers: any) => {
    return axios.post(dataLayerUrl+`/answers/count-ups-only`, { answers });
}

export const getUserAnswered = (id: number, params: any) => {
    return axios.get(dataLayerUrl+`/users/${id}/answered`, { params })
}

export const getOneKeyword = (params: any) => {
    return axios.get(dataLayerUrl+`/keywords/one`, { params });
}