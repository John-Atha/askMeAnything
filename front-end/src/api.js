import axios from 'axios';
import config from './config';

const { 
    questManUrl,
    questRunUrl,
    authUrl,
    statsAnalsUrl,
    esbUrl,
    microAuthUrl,
    microQuestUrl,
    microAnswersUrl,
    microStatsUrl,
    microAnalsUrl,
}  = config


const token = localStorage.getItem('token');
const buildAuthHeader = () => {
    const headers = {
        "Authorization": "Bearer "+token,
    }
    return headers;
}

export const using_SOA_Back_end = () => {
    return !localStorage.getItem('api') || localStorage.getItem('api')==='soa';  
}

export const Login = (username, password) => {
    const bodyFormData = new URLSearchParams();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);
    const requestUrl = (using_SOA_Back_end() ? authUrl : microAuthUrl) + '/login';
    const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
    }
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.post(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        bodyFormData,
        { headers, params },
    );
}

export const Register = (username, password, confirmation, email) => {
    const object = { username, password, confirmation, email };
    const requestUrl = (using_SOA_Back_end() ? authUrl : microAuthUrl) + '/users';
    const params = {
        url: using_SOA_Back_end() ? requestUrl : null,
    }
    return axios.post(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        object,
        { params },
    );
}

export const getOneUser = (id) => {
    const requestUrl = (using_SOA_Back_end() ? authUrl : microAuthUrl) + `/users/${id}`;
    const params = {
        url : using_SOA_Back_end() ? requestUrl : null,
    }
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params },
    )
}

export const getQuestions = (start, end) => {
    const requestUrl =  (using_SOA_Back_end() ? statsAnalsUrl : microAnalsUrl) + '/questions';
    const params = {
        start,
        end,
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getQuestionAnswers = (id, start, end) => {
    const requestUrl = (using_SOA_Back_end() ? questManUrl : microAnswersUrl) + `/questions/${id}/answers`;
    const params = {
        start,
        end,
        url : using_SOA_Back_end() ? requestUrl : null,
    }
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params },
    );
}

export const getOneQuestion = (id) => {
    const requestUrl = (using_SOA_Back_end() ? questManUrl : microQuestUrl) + `/questions/${id}`;
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getQuestionKeywords = (id) => {
    const requestUrl = (using_SOA_Back_end() ? questManUrl : microQuestUrl) + `/questions/${id}/keywords`;
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const isLogged = () => {
    const headers = buildAuthHeader();
    const requestUrl = (using_SOA_Back_end() ? authUrl : microAuthUrl) + '/users/logged';
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.post(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        null,
        { headers, params }
    );
}

export const getAllKeywords = () => {
    const requestUrl = (using_SOA_Back_end() ? questManUrl : microQuestUrl) +`/keywords`;
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getOneKeyword = (id) => {
    const requestUrl = (using_SOA_Back_end() ? questManUrl : microQuestUrl) +`/keywords/${id}`;
    const params = {
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const postQuestion = (title, text) => {
    const headers = buildAuthHeader();
    const requestUrl = (using_SOA_Back_end() ? questManUrl : microQuestUrl) + '/questions';
    const body = { title, text };
    const params = {
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.post(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        body,
        { headers, params }
    );
}

export const attachKeyword = (question_id, keyword_id) => {
    const headers = buildAuthHeader();
    const requestUrl = (using_SOA_Back_end() ? questManUrl : microQuestUrl) +`/questions/${question_id}/keywords/${keyword_id}`;
    const params = {
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.post(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        {},
        { headers, params }
    );
}

export const createKeyword = (name) => {
    const headers = buildAuthHeader();
    const requestUrl = (using_SOA_Back_end() ? questManUrl : microQuestUrl) + '/keywords';
    const params = {
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.post(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        {name},
        { headers, params }
    );
}

export const Answer = (text, questionId) => {
    const headers = buildAuthHeader();
    const body = {
        text,
        question: {
            id: questionId,
        },
    };
    const requestUrl = (using_SOA_Back_end() ? questRunUrl : microAnswersUrl) + '/answers';
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.post(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        body,
        { headers, params }
    );
}

export const questionIsUpvoted = (questionId) => {
    const headers = buildAuthHeader();
    const requestUrl = (using_SOA_Back_end() ?  questManUrl : microQuestUrl) + `/questions/${questionId}/upvoted`;
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { headers, params }
    );
}

export const questionUpvote = (questionId) => {
    const requestUrl = (using_SOA_Back_end() ? questRunUrl : microQuestUrl) + '/question-upvotes';
    const headers = buildAuthHeader();
    const body = {
        question: {
            id: questionId,
        },
    };
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.post(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        body,
        { headers, params }
    );
}

export const questionUnUpvote = (upvoteId) => {
    const requestUrl = (using_SOA_Back_end() ? questRunUrl : microQuestUrl) + `/question-upvotes/${upvoteId}`;
    const headers = buildAuthHeader();
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.delete(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { headers, params }
    ); 
}

export const getOneAnswer = (answerId) => {
    const requestUrl = (using_SOA_Back_end() ? questManUrl : microAnswersUrl) + `/answers/${answerId}`;
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const answerIsUpvoted = (answerId) => {
    const headers = buildAuthHeader();
    const requestUrl = (using_SOA_Back_end() ? questManUrl : microAnswersUrl) + `/answers/${answerId}/upvoted`;
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { headers, params }
    );
}

export const answerUpvote = (answerId) => {
    const requestUrl = (using_SOA_Back_end() ? questRunUrl : microAnswersUrl) + `/answer-upvotes`;
    const headers = buildAuthHeader();
    const body = {
        answer: {
            id: answerId,
        },
    };
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.post(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        body,
        { headers, params }
    );
}

export const answerUnUpvote = (upvoteId) => {
    const requestUrl = (using_SOA_Back_end() ? questRunUrl : microAnswersUrl) + `/answer-upvotes/${upvoteId}`;
    const headers = buildAuthHeader();
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.delete(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { headers, params }
    );
}

export const getKeywordsStatsMonthly = (id) => {
    const requestUrl = (using_SOA_Back_end() ? statsAnalsUrl : microStatsUrl) + `/keywords/${id}/stats/monthly`;
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getKeywordQuestionsPeriod = (id, start, end, month, year) => {
    const requestUrl = (using_SOA_Back_end() ? statsAnalsUrl : microAnalsUrl) + `/keywords/${id}/questions/monthly/${year}/${month}`;
    const params = {
        start,
        end,
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getGeneralQuestionStats = (dummy) => {
    const requestUrl = (using_SOA_Back_end() ? statsAnalsUrl : microStatsUrl) + '/questions/stats/monthly';
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getGeneralQuestionsPeriod = (dummy, start, end, month, year) => {
    const requestUrl = (using_SOA_Back_end() ? statsAnalsUrl : microAnalsUrl) + `/questions/monthly/${year}/${month}`;
    const params = {
        start,
        end,
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getUserQuestionsStatsMonthly = (id) => {
    const requestUrl = (using_SOA_Back_end() ? statsAnalsUrl : microStatsUrl) + `/users/${id}/questions/stats/monthly`;
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getUserQuestionsPeriod = (id, start, end, month, year) => {
    const requestUrl = (using_SOA_Back_end() ? statsAnalsUrl : microAnalsUrl) + `/users/${id}/questions/monthly/${year}/${month}`;
    const params = {
        start,
        end,
        url: using_SOA_Back_end() ? requestUrl : null,
    }
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getUserAnsweredStats = (id) => {
    const requestUrl = (using_SOA_Back_end() ? statsAnalsUrl : microStatsUrl) + `/users/${id}/answered/stats/monthly`;
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getUserAnsweredPeriod = (id, start, end, month, year) => {
    const requestUrl = (using_SOA_Back_end() ? statsAnalsUrl : microAnalsUrl) + `/users/${id}/answered/monthly/${year}/${month}`;
    const params = {
        start,
        end,
        url: using_SOA_Back_end() ? requestUrl : null,
    }
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getGeneralQuestionsStatsDaily = (dummy) => {
    const requestUrl = (using_SOA_Back_end() ? statsAnalsUrl : microStatsUrl) + '/questions/stats/daily';
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getUserQuestionsStatsDaily = (id) => {
    const requestUrl = (using_SOA_Back_end() ? statsAnalsUrl : microStatsUrl) + `/users/${id}/questions/stats/daily`;
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getUserAnswersStatsDaily = (id) => {
    const requestUrl = (using_SOA_Back_end() ? statsAnalsUrl : microStatsUrl) + `/users/${id}/answers/stats/daily`;
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getKeywordsStatsDaily = (id) => {
    const requestUrl = (using_SOA_Back_end() ? statsAnalsUrl : microStatsUrl) + `/keywords/${id}/stats/daily`;
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getGeneralQuestionsStatsMonthly = (dummy) => {
    const requestUrl = (using_SOA_Back_end() ? statsAnalsUrl : microStatsUrl) + `/questions/stats/monthly`;
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getUserAnswersStatsMonthly = (id) => {
    const requestUrl = (using_SOA_Back_end() ? statsAnalsUrl : microStatsUrl) + `/users/${id}/answers/stats/monthly`;
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params }
    );
}

export const getUsersRanking = (start, end) => {
    const headers = buildAuthHeader();
    const requestUrl = (using_SOA_Back_end() ? statsAnalsUrl : microStatsUrl) + '/users/ranking';
    const params = {
        start,
        end,
        url: using_SOA_Back_end() ? requestUrl : null,
    }
    return axios.get(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        { params, headers }
    );
}

export const updateUser = (obj, id) => {
    const headers = buildAuthHeader();
    const requestUrl = (using_SOA_Back_end() ? authUrl : microAuthUrl) + `/users/${id}`;
    const params = { 
        url: using_SOA_Back_end() ? requestUrl : null,
    };
    return axios.patch(
        using_SOA_Back_end() ? esbUrl : requestUrl,
        obj,
        { params, headers }
    );
}