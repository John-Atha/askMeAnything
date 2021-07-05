const axios = require('axios');

const authMicroUrl = 'https://askmeanything-micro-auth.herokuapp.com';
const questionsMicroUrl = 'https://askmeanything-micro-questions.herokuapp.com';
const answersMicroUrl = 'https://askmeanything-micro-answers.herokuapp.com';

export const getOneUser = (id: number) => {
    return axios.get(authMicroUrl+`/users/${id}`);
}

export const getOneQuestion = (id: number) => {
    return axios.get(questionsMicroUrl+`/questions/${id}`);
}

export const countOneQuestionUpvotes = (id: number) => {
    return axios.get(questionsMicroUrl+`/questions/${id}/upvotes/count`);
}

export const countOneAnswerUpvotes = (id: number) => {
    return axios.get(answersMicroUrl+`/answers/${id}/upvotes/count`);
}