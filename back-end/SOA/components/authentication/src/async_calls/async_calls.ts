import { CreateUserDto } from "../user/dto/create-user.dto";
import { UpdateUserDto } from "../user/dto/update-user.dto";

const axios = require('axios');

//const dataLayerUrl = 'http://localhost:3006';
const dataLayerUrl = 'https://askmeanything-soa-data-layer.herokuapp.com'

export const getAllUsers = () => {
    return axios.get(dataLayerUrl+`/users`);
}

export const getOneUser = (params) => {
    return axios.get(dataLayerUrl+'/users/one', { params });
}
export const getOneUserWithPass = (params) => {
    return axios.get(dataLayerUrl+'/users/one/pass', { params });
}
export const updateUser = (id: number, updateUserDto: UpdateUserDto) => {
    return axios.patch(dataLayerUrl+`/users/${id}`, updateUserDto);
}

export const deleteUser = (id: number) => {
    return axios.delete(dataLayerUrl+`/users/${id}`);
}

export const createUser = (createUserDto: CreateUserDto) => {
    return axios.post(dataLayerUrl+`/users`, createUserDto);
}