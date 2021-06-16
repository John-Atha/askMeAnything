const axios = require('axios');

const authMicroUrl = 'http://localhost:3008';

export const getOneUser = (id: number) => {
    return axios.get(authMicroUrl+`/users/${id}`);
}

export const isLogged = (token: any) => {
    const headers = {
        "Authorization": `Bearer ${token}`,
    }
    return axios.post(authMicroUrl+`/users/logged`, {}, { headers });
}