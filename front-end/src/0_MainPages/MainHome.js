import React, { useState } from 'react';

import AnswerQuestion from './AnswerQuestion';
import AskQuestion from './AskQuestion';
import PeriodQuestions from './PeriodQuestions';
import KeywordQuestions from './KeywordQuestions';
import Carousel from 'react-bootstrap/Carousel';

function MainHome() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    return(
        <div className="main-page center-content">
            <Carousel activeIndex={index} onSelect={handleSelect} className='carousel' style={{'height': '400px'}}>
                <Carousel.Item interval={5000}>
                    <AskQuestion />
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                        <AnswerQuestion />
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <PeriodQuestions />
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <KeywordQuestions />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default MainHome;