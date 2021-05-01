import axios from 'axios';
import config from './config';

const questManUrl = config.questManUrl;
const questRunUrl = config.questRunUrl;
const authUrl = config.authUrl;

export const getQuestions = (start, end) => {
    const requestUrl = questManUrl+"/questions";
    const params = {
        start: start,
        end: end,
    }
    return axios.get(requestUrl, {
        params: params,
    })
}

export const Login = (username, password) => {
    const requestUrl = authUrl+"/login";
    const bodyFormData = new URLSearchParams();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);
    return axios.post(requestUrl, bodyFormData, {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded', 
        }
    });
}

export const Register = (username, password, confirmation, email) => {
    const requestUrl = authUrl+"/users";
    const object = { username, password, confirmation, email };
    return axios.post(requestUrl, object);
}