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

export const pointsUpd = (id: number, token: any, how: string) => {
    const headers = {
        "Authorization": `Bearer ${token}`,
    }
    console.log('Patching at: '+authMicroUrl+`/users/points/${how}`);
    return axios.patch(authMicroUrl+`/users/${id}/points/${how}`, {}, { headers })
}