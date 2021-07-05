"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.choreoPost = void 0;
const axios = require('axios');
const myUrl = 'https://askmeanything-micro-auth.herokuapp.com';
const choreoUrl = 'https://askmeanything-micro-choreo.herokuapp.com';
const choreoPost = (action, object, id, targetEntity) => {
    const obj = { action, object, id, src: myUrl, targetEntity };
    return axios.post(choreoUrl + '/choreo', obj);
};
exports.choreoPost = choreoPost;
//# sourceMappingURL=async_calls.js.map