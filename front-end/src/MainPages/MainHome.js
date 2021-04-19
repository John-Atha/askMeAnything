import React from 'react';

import AnswerQuestion from './AnswerQuestion';
import AskQuestion from './AskQuestion';
import PeriodQuestions from './PeriodQuestions';

function MainHome() {
    return(
        <div className="flex-layout">
            <AskQuestion />
            <AnswerQuestion />
            <PeriodQuestions />
        </div>
    )
}

export default MainHome;