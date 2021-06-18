const axios = require('axios');

const myUrl = 'http://localhost:3008';
const choreoUrl = 'http://localhost:3013';

export const choreoPost = (action: string, object: any, id: number, targetEntity: string) => {
    const obj = { action, object, id, src: myUrl, targetEntity };
    return axios.post(choreoUrl+'/choreo', obj);
}