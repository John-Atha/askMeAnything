const axios = require('axios');

const authMicroUrl = 'https://askmeanything-micro-auth.herokuapp.com';

export const isLogged = (token: any) => {
    const headers = {
        "Authorization": `Bearer ${token}`,
    }
    return axios.post(authMicroUrl+`/users/logged`, {}, { headers });
}
