import { CreateAnswerUpvoteDto } from "src/answer-upvote/dto/create-answer-upvote.dto";
import { CreateAnswerDto } from "src/answer/dto/create-answer.dto";

const axios = require('axios');
const dataLayerUrl = 'http://localhost:3006';

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