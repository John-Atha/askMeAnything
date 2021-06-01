import { UpdateUserDto } from "../user/dto/update-user.dto";

const axios = require('axios');
const dataLayerUrl = 'http://localhost:3006';

export const getAllUsers = () => {
    //const params = { start, end };
    return axios.get(dataLayerUrl+`/users`);
}

export const getOneUser = (params) => {
    return axios.get(dataLayerUrl+'/users/one', { params });
}
export const getOneUserWithPass = (params) => {
    return axios.get(dataLayerUrl+'/users/one/pass', { params });
}
export const updateUser = (id: number, updateUserDto: UpdateUserDto) => {
    return axios.patch(dataLayerUrl+`/users/${id}`, { updateUserDto });
}

export const deleteUser = (id: number) => {
    return axios.delete(dataLayerUrl+`users/${id}`);
}

export const createUser = (createUserDto: any) => {
    return axios.post(dataLayerUrl+`/users`, { createUserDto });
}