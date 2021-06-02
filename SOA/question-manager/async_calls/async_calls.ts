import { CreateQuestionDto } from "src/question/dto/create-question.dto";
import { UpdateQuestionDto } from "src/question/dto/update-question.dto";

const axios = require('axios');
const dataLayerUrl = 'http://localhost:3006';

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