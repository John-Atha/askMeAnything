import React from 'react';

import Contact from './Contact';
import Basics from './Basics';
import StatsCarousel from './StatsCarousel';

import './styles.css';
import PeriodQuestionsGen from '../1_PeriodQuestionsGen/PeriodQuestionsGen';



function ProfileMain(props) {
    return(
        <div className="margin-top-smaller">
            <div className="flex-layout">
                <Basics user={props.user} />
                <Contact user={props.user} />
            </div>
            <div className='flex-layout'>
                <StatsCarousel case='questions' user={props.user} />
                <StatsCarousel case='answers' user={props.user} />
            </div>
            <PeriodQuestionsGen case='user' id={props.user.id} username={props.user.username} />
        </div>
    )
}

export default ProfileMain;