"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogged = void 0;
const axios = require('axios');
const authMicroUrl = 'https://askmeanything-micro-auth.herokuapp.com';
const isLogged = (token) => {
    const headers = {
        "Authorization": `Bearer ${token}`,
    };
    return axios.post(authMicroUrl + `/users/logged`, {}, { headers });
};
exports.isLogged = isLogged;
//# sourceMappingURL=async_calls.js.map