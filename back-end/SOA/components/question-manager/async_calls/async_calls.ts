import { CreateKeywordDto } from "src/keyword/dto/create-keyword.dto";
import { CreateQuestionDto } from "src/question/dto/create-question.dto";
import { UpdateQuestionDto } from "src/question/dto/update-question.dto";

const axios = require('axios');
const dataLayerUrl = 'http://localhost:3006';
const EsbUrl = 'http://localhost:3007';
const authUrl = 'http://localhost:3002';

export const getOneQuestion = (params) => {
    return axios.get(dataLayerUrl+`/questions/one`, { params });
}

export const getOneUser = (params) => {
    return axios.get(dataLayerUrl+'/users/one', { params });
}

export const createQuestion = (createQuestionDto: CreateQuestionDto, owner) => {
    return axios.post(dataLayerUrl+`/questions`, { createQuestionDto, owner });
}

export const updateQuestion = (id: number, updateQuestionDto: UpdateQuestionDto) => {
    return axios.patch(dataLayerUrl+`/questions/${id}`, updateQuestionDto);
}

export const deleteQuestion = (id: number) => {
    return axios.delete(dataLayerUrl+`/questions/${id}`);
}

export const answerCountUpvotes = (id: number) => {
    return axios.get(dataLayerUrl+`/questions/${id}/answers/count-upvotes`);
}

export const getOneKeyword = (params: any) => {
    return axios.get(dataLayerUrl+`/keywords/one`, { params });
}

export const getAllKeywords = () => {
    return axios.get(dataLayerUrl+`/keywords`);
}

export const updateQuestionKeywords = (question_id: number, keywords: any) => {
    return axios.post(dataLayerUrl+`/questions/${question_id}/keywords`, keywords);
}

export const questionIsUpvoted = (user_id: number, quest_id: number) => {
    return axios.get(dataLayerUrl+`/questions/${quest_id}/upvoted/${user_id}`);
}

export const createKeyword = (createKeywordDto: CreateKeywordDto) => {
    return axios.post(dataLayerUrl+`/keywords`, createKeywordDto);
}

export const getOneAnswer = (params: any) => {
    return axios.get(dataLayerUrl+`/answers/one`, { params });
}

export const getAnswerUpvotes = (id: number) => {
    return axios.get(dataLayerUrl+`/answers/${id}/upvotes`);
}

export const answerIsUpvoted = (user_id: number, answer_id: number) => {
    return axios.get(dataLayerUrl+`/answers/${answer_id}/upvoted/${user_id}`);
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