import React, { useState } from 'react';

import AnswerQuestion from './AnswerQuestion';
import AskQuestion from './AskQuestion';
import PeriodQuestions from './PeriodQuestions';
import KeywordQuestions from './KeywordQuestions';
import StatsCarousel from '../4_Profile/StatsCarousel';
import Carousel from 'react-bootstrap/Carousel';
import './styles.css';

function MainHome() {

    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    if (window.innerWidth >= 500) {
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
    else {
        return(
            <div className="main-page center-content">
                <Carousel activeIndex={index} onSelect={handleSelect} className='carousel' id='carousel-responsive'>
                    <Carousel.Item interval={4000}>
                        <AskQuestion />
                    </Carousel.Item>
                    <Carousel.Item interval={4000}>
                        <AnswerQuestion />
                    </Carousel.Item>
                    <Carousel.Item interval={4000}>
                        <PeriodQuestions />
                    </Carousel.Item>
                    <Carousel.Item interval={4000}>
                        <KeywordQuestions />
                    </Carousel.Item>
                </Carousel>
                <div className='margin-top' />
                <StatsCarousel case='home-page' />
            </div>
        )
    }
}

export default MainHome;