import React, { useState } from 'react';

import AnswerQuestion from './AnswerQuestion';
import AskQuestion from './AskQuestion';
import PeriodQuestions from './PeriodQuestions';
import KeywordQuestions from './KeywordQuestions';
import Carousel from 'react-bootstrap/Carousel';
import StatsCarousel from '../4_Profile/StatsCarousel';

function MainHome() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    return(
        <div className="main-page center-content">
            <div className='flex-layout center-content'>
                <AskQuestion />
                <AnswerQuestion />
                <PeriodQuestions />
                <KeywordQuestions />
            </div>
            <div className='margin-top' />
            <StatsCarousel case='questions-gen' />
        </div>
    )
}

export default MainHome;