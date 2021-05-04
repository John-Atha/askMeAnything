import axios from 'axios';
import config from './config';

const questManUrl = config.questManUrl;
const questRunUrl = config.questRunUrl;
const authUrl = config.authUrl;

const token = localStorage.getItem('token');
const buildAuthHeader = () => {
    const headers = {
        "Authorization": "Bearer "+token,
    }
    return headers;
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

export const getQuestions = (start, end) => {
    const requestUrl = questManUrl+"/questions";
    const params = {
        start: start,
        end: end,
    };
    return axios.get(requestUrl, {
        params: params,
    });
}

export const getQuestionAnswers = (id, start, end) => {
    const requestUrl = questManUrl+`/questions/${id}/answers`;
    const params = {
        start: start,
        end: end,
    };
    return axios.get(requestUrl, {
        params: params,
    });
}

export const getOneQuestion = (id) => {
    const requestUrl = questManUrl+`/questions/${id}`;
    return axios.get(requestUrl);
}

export const getQuestionKeywords = (id) => {
    const requestUrl = questManUrl+`/questions/${id}/keywords`;
    return axios.get(requestUrl);
}

export const isLogged = () => {
    const headers = buildAuthHeader();
    const requestUrl = authUrl+`/users/logged`;
    return axios.post(requestUrl, {}, {headers});
}

export const getAllKeywords = () => {
    const requestUrl = questManUrl+`/keywords`;
    return axios.get(requestUrl);
}

export const postQuestion = (title, text) => {
    const headers = buildAuthHeader();
    const requestUrl = questManUrl+'/questions';
    const body = { title, text };
    return axios.post(requestUrl, body, {headers});
}

export const attachKeyword = (question_id, keyword_id) => {
    const headers = buildAuthHeader();
    const requestUrl = questManUrl+`/questions/${question_id}/keywords/${keyword_id}`;
    return axios.post(requestUrl, {}, {headers});
}

export const createKeyword = (name) => {
    const headers = buildAuthHeader();
    const requestUrl = questManUrl+'/keywords';
    return axios.post(requestUrl, {name}, {headers});
}

export const Answer = (text, questionId) => {
    const headers = buildAuthHeader();
    const body = {
        text,
        question: {
            id: questionId,
        },
    };
    const requestUrl = questRunUrl+'/answers';
    return axios.post(requestUrl, body, {headers});
}

export const questionIsUpvoted = (questionId) => {
    const headers = buildAuthHeader();
    const requestUrl = questManUrl+`/questions/${questionId}/upvoted`;
    return axios.get(requestUrl, {headers});
}

export const questionUpvote = (questionId) => {
    const requestUrl = questRunUrl+'/question-upvotes';
    const headers = buildAuthHeader();
    const body = {
        question: {
            id: questionId,
        },
    };
    return axios.post(requestUrl, body, {headers});
}

export const questionUnUpvote = (upvoteId) => {
    const requestUrl = questRunUrl+`/question-upvotes/${upvoteId}`;
    const headers = buildAuthHeader();
    return axios.delete(requestUrl, {headers}); 
}

export const getOneAnswer = (answerId) => {
    const requestUrl = questManUrl+`/answers/${answerId}`;
    return axios.get(requestUrl);
}

export const answerIsUpvoted = (answerId) => {
    const headers = buildAuthHeader();
    const requestUrl = questManUrl+`/answers/${answerId}/upvoted`;
    return axios.get(requestUrl, {headers});
}

export const answerUpvote = (answerId) => {
    const requestUrl = questRunUrl+`/answer-upvotes`;
    const headers = buildAuthHeader();
    const body = {
        answer: {
            id: answerId,
        },
    };
    return axios.post(requestUrl, body, {headers});
}

export const answerUnUpvote = (upvoteId) => {
    const requestUrl = questRunUrl+`/answer-upvotes/${upvoteId}`;
    const headers = buildAuthHeader();
    return axios.delete(requestUrl, {headers});
}