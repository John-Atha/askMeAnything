import React from 'react';

import AnswerQuestion from './AnswerQuestion';
import AskQuestion from './AskQuestion';
import PeriodQuestions from './PeriodQuestions';
import KeywordQuestions from './KeywordQuestions';
import StatsCarousel from '../4_Profile/StatsCarousel';

function MainHome() {

    return(
        <div className="main-page center-content">
            <div className='flex-layout center-content'>
                <AskQuestion />
                <AnswerQuestion />
                <PeriodQuestions />
                <KeywordQuestions />
            </div>
            <div className='margin-top' />
            <StatsCarousel case='home-page' />
        </div>
    )
}

export default MainHome;