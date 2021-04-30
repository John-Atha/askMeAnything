import axios from 'axios';
import config from './config';
axios.defaults.baseURL = config.apiUrl;

export const getQuestions = (start, end) => {
    const requestUrl = "/questions";
    const params = {
        start: start,
        end: end,
    }
    return axios.get(requestUrl, {
        params: params,
    })
}