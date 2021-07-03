"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.deleteUser = exports.updateUser = exports.getOneUserWithPass = exports.getOneUser = exports.getAllUsers = void 0;
const axios = require('axios');
const dataLayerUrl = 'https://askmeanything-soa-data-layer.herokuapp.com';
const getAllUsers = () => {
    return axios.get(dataLayerUrl + `/users`);
};
exports.getAllUsers = getAllUsers;
const getOneUser = (params) => {
    return axios.get(dataLayerUrl + '/users/one', { params });
};
exports.getOneUser = getOneUser;
const getOneUserWithPass = (params) => {
    return axios.get(dataLayerUrl + '/users/one/pass', { params });
};
exports.getOneUserWithPass = getOneUserWithPass;
const updateUser = (id, updateUserDto) => {
    return axios.patch(dataLayerUrl + `/users/${id}`, updateUserDto);
};
exports.updateUser = updateUser;
const deleteUser = (id) => {
    return axios.delete(dataLayerUrl + `/users/${id}`);
};
exports.deleteUser = deleteUser;
const createUser = (createUserDto) => {
    return axios.post(dataLayerUrl + `/users`, createUserDto);
};
exports.createUser = createUser;
//# sourceMappingURL=async_calls.js.map