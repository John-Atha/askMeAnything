import axios from 'axios';
import config from './config';

const questManUrl = config.questManUrl;
const questRunUrl = config.questRunUrl;
const authUrl = config.authUrl;
const analsUrl = config.analsUrl;
const statsUrl = config.statsUrl;
const esbUrl = config.esbUrl;

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
    const params = { url: requestUrl };
    return axios.post(esbUrl, bodyFormData, {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded', 
        },
        params,
    });
}

export const Register = (username, password, confirmation, email) => {
    const requestUrl = authUrl+"/users";
    const params = { url: requestUrl };
    const object = { username, password, confirmation, email };
    return axios.post(esbUrl, object, { params });
}

export const getOneUser = (id) => {
    const requestUrl = authUrl+`/users/${id}`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getQuestions = (start, end) => {
    const requestUrl = analsUrl+"/questions";
    const params = { start, end, url: requestUrl };
    return axios.get(esbUrl, {params});
}

export const getQuestionAnswers = (id, start, end) => {
    const requestUrl = questManUrl+`/questions/${id}/answers`;
    const params = { start, end, url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getOneQuestion = (id) => {
    const requestUrl = questManUrl+`/questions/${id}`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getQuestionKeywords = (id) => {
    const requestUrl = questManUrl+`/questions/${id}/keywords`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const isLogged = () => {
    const headers = buildAuthHeader();
    const requestUrl = authUrl+'/users/logged';
    const params = { url: requestUrl };
    console.log({ headers, params });
    return axios.post(esbUrl, null, { headers, params });
}

export const getAllKeywords = () => {
    const requestUrl = questManUrl+`/keywords`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getOneKeyword = (id) => {
    const requestUrl = questManUrl+`/keywords/${id}`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const postQuestion = (title, text) => {
    const headers = buildAuthHeader();
    const requestUrl = questManUrl+'/questions';
    const body = { title, text };
    const params = { url: requestUrl };
    return axios.post(esbUrl, body, { headers, params });
}

export const attachKeyword = (question_id, keyword_id) => {
    const headers = buildAuthHeader();
    const requestUrl = questManUrl+`/questions/${question_id}/keywords/${keyword_id}`;
    const params = { url: requestUrl };
    return axios.post(esbUrl, {}, { headers, params });
}

export const createKeyword = (name) => {
    const headers = buildAuthHeader();
    const requestUrl = questManUrl+'/keywords';
    const params = { url: requestUrl };
    return axios.post(esbUrl, {name}, { headers, params });
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
    const params = { url: requestUrl };
    return axios.post(esbUrl, body, { headers, params });
}

export const questionIsUpvoted = (questionId) => {
    const headers = buildAuthHeader();
    const requestUrl = questManUrl+`/questions/${questionId}/upvoted`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, { headers, params });
}

export const questionUpvote = (questionId) => {
    const requestUrl = questRunUrl+'/question-upvotes';
    const headers = buildAuthHeader();
    const body = {
        question: {
            id: questionId,
        },
    };
    const params = { url: requestUrl };
    return axios.post(esbUrl, body, { headers, params });
}

export const questionUnUpvote = (upvoteId) => {
    const requestUrl = questRunUrl+`/question-upvotes/${upvoteId}`;
    const headers = buildAuthHeader();
    const params = { url: requestUrl };
    return axios.delete(esbUrl, { headers, params }); 
}

export const getOneAnswer = (answerId) => {
    const requestUrl = questManUrl+`/answers/${answerId}`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const answerIsUpvoted = (answerId) => {
    const headers = buildAuthHeader();
    const requestUrl = questManUrl+`/answers/${answerId}/upvoted`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, { headers, params });
}

export const answerUpvote = (answerId) => {
    const requestUrl = questRunUrl+`/answer-upvotes`;
    const headers = buildAuthHeader();
    const body = {
        answer: {
            id: answerId,
        },
    };
    const params = { url: requestUrl };
    return axios.post(esbUrl, body, { headers, params });
}

export const answerUnUpvote = (upvoteId) => {
    const requestUrl = questRunUrl+`/answer-upvotes/${upvoteId}`;
    const headers = buildAuthHeader();
    const params = { url: requestUrl };
    return axios.delete(esbUrl, { headers, params });
}

export const getKeywordsStatsMonthly = (id) => {
    const requestUrl = statsUrl+`/keywords/${id}/stats/monthly`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getKeywordQuestionsPeriod = (id, start, end, month, year) => {
    const requestUrl = analsUrl+`/keywords/${id}/questions/monthly/${year}/${month}`;
    const params = { start, end, url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getGeneralQuestionStats = (dummy) => {
    const requestUrl = statsUrl+'/questions/stats/monthly';
    const params = { url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getGeneralQuestionsPeriod = (dummy, start, end, month, year) => {
    const requestUrl = analsUrl+`/questions/monthly/${year}/${month}`;
    const params = { start, end, url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getUserQuestionsStatsMonthly = (id) => {
    const requestUrl = statsUrl+`/users/${id}/questions/stats/monthly`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, {   validateStatus: function (status) {
        return status >= 200 && status < 300; // default
      }, params });
}

export const getUserQuestionsPeriod = (id, start, end, month, year) => {
    const requestUrl = analsUrl+`/users/${id}/questions/monthly/${year}/${month}`;
    const params = { start, end, url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getUserAnsweredStats = (id) => {
    const requestUrl = statsUrl+`/users/${id}/answered/stats/monthly`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getUserAnsweredPeriod = (id, start, end, month, year) => {
    const requestUrl = analsUrl+`/users/${id}/answered/monthly/${year}/${month}`;
    const params = { start, end, url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getGeneralQuestionsStatsDaily = (dummy) => {
    const requestUrl = statsUrl+'/questions/stats/daily';
    const params = { url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getUserQuestionsStatsDaily = (id) => {
    const requestUrl = statsUrl+`/users/${id}/questions/stats/daily`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getUserAnswersStatsDaily = (id) => {
    const requestUrl = statsUrl+`/users/${id}/answers/stats/daily`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getKeywordsStatsDaily = (id) => {
    const requestUrl = statsUrl+`/keywords/${id}/stats/daily`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getGeneralQuestionsStatsMonthly = (dummy) => {
    const requestUrl = statsUrl+`/questions/stats/monthly`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getUserAnswersStatsMonthly = (id) => {
    const requestUrl = statsUrl+`/users/${id}/answers/stats/monthly`;
    const params = { url: requestUrl };
    return axios.get(esbUrl, { params });
}

export const getUsersRanking = (start, end) => {
    const headers = buildAuthHeader();
    const requestUrl = statsUrl+'/users/ranking';
    const params = { start, end, url: requestUrl };
    return axios.get(esbUrl, { params, headers });
}
