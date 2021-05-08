import React, { useState, useEffect } from 'react';

import { isLogged } from '../api';

import AnswerQuestion from './AnswerQuestion';
import AskQuestion from './AskQuestion';
import MyQuestions from './MyQuestions';
import MyContributions from './MyContributions';

function MyHome() {

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        isLogged()
        .then(response => {
            setUserId(response.data.id);
        })
        .catch(err => {
            window.location.href='/';
        })
    })

    return(
        <div className="flex-layout main-page">
            <AskQuestion />
            <AnswerQuestion />
            <MyQuestions id={userId} />
            <MyContributions id={userId} />
        </div>
    )
}

export default MyHome;