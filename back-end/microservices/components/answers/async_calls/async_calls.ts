const axios = require('axios');

const authMicroUrl = 'https://askmeanything-micro-auth.herokuapp.com';
const questionsMicroUrl = 'https://askmeanything-micro-questions.herokuapp.com';
const myUrl = 'https://askmeanything-micro-answers.herokuapp.com';
const choreoUrl = 'https://askmeanything-micro-choreo.herokuapp.com';

export const getOneUser = (id: number) => {
    return axios.get(authMicroUrl+`/users/${id}`);
}

export const getOneQuestion = (id: number) => {
    return axios.get(questionsMicroUrl+`/questions/${id}`);
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

export const choreoPost = (action: string, object: any, id: number, targetEntity: string) => {
    const obj = { action, object, id, src: myUrl, targetEntity };
    return axios.post(choreoUrl+'/choreo', obj);
}