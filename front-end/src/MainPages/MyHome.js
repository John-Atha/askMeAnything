import React from 'react';

import AnswerQuestion from './AnswerQuestion';
import AskQuestion from './AskQuestion';
import MyQuestions from './MyQuestions';
import KeywordQuestions from './KeywordQuestions';
import MyContributions from './MyContributions';

function MyHome() {
    return(
        <div className="flex-layout main-page">
            <AskQuestion />
            <AnswerQuestion />
            <MyQuestions />
            <MyContributions />
        </div>
    )
}

export default MyHome;