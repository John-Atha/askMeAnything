import React from 'react';

import AnswerQuestion from './AnswerQuestion';
import AskQuestion from './AskQuestion';
import PeriodQuestions from './PeriodQuestions';
import KeywordQuestions from './KeywordQuestions';

function MainHome() {
    return(
        <div className="flex-layout main-page">
            <AskQuestion />
            <AnswerQuestion />
            <PeriodQuestions />
            <KeywordQuestions />
        </div>
    )
}

export default MainHome;