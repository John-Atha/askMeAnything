"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.choreoPost = exports.pointsUpd = exports.isLogged = exports.getOneQuestion = exports.getOneUser = void 0;
const axios = require('axios');
const authMicroUrl = 'https://askmeanything-micro-auth.herokuapp.com';
const questionsMicroUrl = 'https://askmeanything-micro-questions.herokuapp.com';
const myUrl = 'https://askmeanything-micro-answers.herokuapp.com';
const choreoUrl = 'https://askmeanything-micro-choreo.herokuapp.com';
const getOneUser = (id) => {
    return axios.get(authMicroUrl + `/users/${id}`);
};
exports.getOneUser = getOneUser;
const getOneQuestion = (id) => {
    return axios.get(questionsMicroUrl + `/questions/${id}`);
};
exports.getOneQuestion = getOneQuestion;
const isLogged = (token) => {
    const headers = {
        "Authorization": `Bearer ${token}`,
    };
    return axios.post(authMicroUrl + `/users/logged`, {}, { headers });
};
exports.isLogged = isLogged;
const pointsUpd = (id, token, how) => {
    const headers = {
        "Authorization": `Bearer ${token}`,
    };
    console.log('Patching at: ' + authMicroUrl + `/users/points/${how}`);
    return axios.patch(authMicroUrl + `/users/${id}/points/${how}`, {}, { headers });
};
exports.pointsUpd = pointsUpd;
const choreoPost = (action, object, id, targetEntity) => {
    const obj = { action, object, id, src: myUrl, targetEntity };
    return axios.post(choreoUrl + '/choreo', obj);
};
exports.choreoPost = choreoPost;
//# sourceMappingURL=async_calls.js.map