import React, { useState, useEffect } from 'react';

import { isLogged } from '../api';

import AnswerQuestion from './AnswerQuestion';
import AskQuestion from './AskQuestion';
import MyQuestions from './MyQuestions';
import MyContributions from './MyContributions';
import Carousel from 'react-bootstrap/Carousel';
import StatsCarousel from '../4_Profile/StatsCarousel';

function MyHome() {
    const [index, setIndex] = useState(0);
    const [userId, setUserId] = useState(null);
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    useEffect(() => {
        isLogged()
        .then(response => {
            setUserId(response.data.id);
        })
        .catch(err => {
            window.location.href='/';
        })
    }, [])
        /*
            <Carousel activeIndex={index} onSelect={handleSelect} className='carousel' style={{'height': '400px'}}>
                <Carousel.Item interval={5000}>
                    <AskQuestion />
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                        <AnswerQuestion />
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <MyQuestions id={userId} />
                </Carousel.Item>
                <Carousel.Item>
                    <MyContributions id={userId} />
                </Carousel.Item>
            </Carousel>
        */
    return(
        <div className="main-page center-content">
            <div className='flex-layout center-content'>
                <AskQuestion />
                <AnswerQuestion />
                <MyQuestions id={userId} />
                <MyContributions id={userId} />
            </div>
            <div className='margin-top' />
            { userId && 
                <StatsCarousel case='questions' user={ { id: userId } } />            
            }
        </div>
    )
}

export default MyHome;