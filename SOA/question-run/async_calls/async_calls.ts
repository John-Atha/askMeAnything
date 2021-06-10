import { CreateAnswerUpvoteDto } from "src/answer-upvote/dto/create-answer-upvote.dto";
import { CreateAnswerDto } from "src/answer/dto/create-answer.dto";

const axios = require('axios');
const dataLayerUrl = 'http://localhost:3006';
const EsbUrl = 'http://localhost:3007';
const authUrl = 'http://localhost:3002';

export const getOneUser = (params: any) => {
    return axios.get(dataLayerUrl+'/users/one', { params });
}

export const getOneQuestion = (params: any) => {
    return axios.get(dataLayerUrl+`/questions/one`, { params });
}

export const createAnswer = (createAnswerDto: CreateAnswerDto, question_id: number, owner_id: number) => {
    return axios.post(dataLayerUrl+`/answers`, { createAnswerDto, question_id, owner_id });
}

export const getOneAnswer = (params: any) => {
    return axios.get(dataLayerUrl+`/answers/one`, { params });
}

export const updAnswerText = (id: number, text: string) => {
    return axios.patch(dataLayerUrl+`/answers/${id}`, { text });
}

export const deleteAnswer = (id: number) => {
    return axios.delete(dataLayerUrl+`/answers/${id}`);
}

export const createAnswerUpvote = (createAnswerUpvoteDto: any) => {
    return axios.post(dataLayerUrl+`/answer-upvotes`, createAnswerUpvoteDto);
}

export const getOneAnswerUpvote = (params: any) => {
    return axios.get(dataLayerUrl+`/answer-upvotes/one`, { params });
}

export const deleteAnswerUpvote = (id: number) => {
    return axios.delete(dataLayerUrl+`/answer-upvotes/${id}`);
}

export const answerIsUpvoted = (user_id: number, answer_id: number) => {
    return axios.get(dataLayerUrl+`/answers/${answer_id}/upvoted/${user_id}`);
}

export const questionIsUpvoted = (user_id: number, quest_id: number) => {
    return axios.get(dataLayerUrl+`/questions/${quest_id}/upvoted/${user_id}`);
}

export const createQuestionUpvote = (createQuestionUpvoteDto: any) => {
    return axios.post(dataLayerUrl+`/question-upvotes`, createQuestionUpvoteDto);
}

export const getOneQuestionUpvote = (params: any) => {
    return axios.get(dataLayerUrl+`/question-upvotes/one`, { params });
}

export const deleteQuestionUpvote = (id: number) => {
    return axios.delete(dataLayerUrl+`/question-upvotes/${id}`);
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