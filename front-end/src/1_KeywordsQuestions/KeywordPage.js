import React, { useState, useEffect } from 'react';

import { getOneKeyword } from '../api';

import PeriodQuestionsGen from '../1_PeriodQuestionsGen/PeriodQuestionsGen';
import DailyStats from '../3_Statistics/Pages/DailyStats';
import MonthlyStats from '../3_Statistics/Pages/MonthlyStats';
import MyNavbar from '../Navbar/MyNavbar';
import Footer from '../Footer/Footer';
import Carousel from 'react-bootstrap/Carousel';

function KeywordPage(props) {
    const [name, setName] = useState(null);
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    useEffect(() => {
        getOneKeyword(props.id)
        .then(response => {
            setName(response.data.name);
        })
    }, [props.id])

    return(
        <div className="home-container" style={{'paddingBottom': '100px'}}>
            <MyNavbar />
            {name &&
                <div className="margin-top-small">
                    <PeriodQuestionsGen case='keyword' id={props.id} name={name} />
                    <Carousel activeIndex={index} onSelect={handleSelect} className='carousel' style={{'marginTop': '-100px'}}>
                        <Carousel.Item interval={5000}>
                            <DailyStats case='keyword' id={props.id} name={name} />
                        </Carousel.Item>
                        <Carousel.Item interval={5000}>
                            <MonthlyStats case='keyword' id={props.id} name={name} />
                        </Carousel.Item>
                    </Carousel>
                </div>
            }
            {!name &&
                <div className="error-message margin-top-small">
                    Sorry, could not find the keyword you are looking for
                </div>
            }
            <Footer />
        </div>
    )
}

export default KeywordPage;