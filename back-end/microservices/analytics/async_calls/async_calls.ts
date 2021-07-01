const axios = require('axios');

const authMicroUrl = 'http://localhost:3008';
const questionsMicroUrl = 'http://localhost:3009';
const answersMicroUrl = 'http://localhost:3010';

export const isLogged = (token: any) => {
    const headers = {
        "Authorization": `Bearer ${token}`,
    }
    return axios.post(authMicroUrl+`/users/logged`, {}, { headers });
}

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