const axios = require('axios');

const myUrl = 'https://askmeanything-micro-auth.herokuapp.com';
const choreoUrl = 'https://askmeanything-micro-choreo.herokuapp.com';

export const choreoPost = (action: string, object: any, id: number, targetEntity: string) => {
    const obj = { action, object, id, src: myUrl, targetEntity };
    return axios.post(choreoUrl+'/choreo', obj);
}