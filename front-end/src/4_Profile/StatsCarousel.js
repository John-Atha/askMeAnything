import React, { useState } from 'react';

import Carousel from 'react-bootstrap/Carousel';
import DailyStats from '../3_Statistics/Pages/DailyStats';
import MonthlyStats from '../3_Statistics/Pages/MonthlyStats';
import './styles.css';

function StatsCarousel(props) {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect} className='carousel' id='carousel-responsive'>
        {props.case==='questions-gen' &&
            <Carousel.Item interval={5000}>
                <MonthlyStats case='questions' />
            </Carousel.Item>
        }
        {props.case==='questions-gen' &&
            <Carousel.Item interval={5000}>
                <DailyStats case='questions' />
            </Carousel.Item>
        }
        {props.case==='questions' &&
            <Carousel.Item interval={5000}>
                <DailyStats case='questions-user' id={props.user.id}/>
            </Carousel.Item>
        }
        {props.case==='questions' &&
            <Carousel.Item interval={5000}>
                <MonthlyStats case='questions-user' id={props.user.id}/>
            </Carousel.Item>
        }
        {props.case==='answers' &&
            <Carousel.Item interval={5000}>
                <DailyStats case='answers-user' id={props.user.id}/>
            </Carousel.Item>    
        }
        {props.case==='answers' &&
            <Carousel.Item interval={5000}>
                <MonthlyStats case='answers-user' id={props.user.id}/>
            </Carousel.Item>
        }
      </Carousel>
    );
}
  
export default StatsCarousel;