import React, { useEffect, useState } from 'react';

import Contact from './Contact';
import Basics from './Basics';
import StatsCarousel from './StatsCarousel';

import './styles.css';
import PeriodQuestionsGen from '../1_PeriodQuestionsGen/PeriodQuestionsGen';

function ProfileMain(props) {
    const [user, setUser] = useState(props.user);

    useEffect(() => {
        setUser(props.user);
    }, [props.user])

    return(
        <div className="margin-top-smaller">
            <div className="flex-layout center-content">
                <Basics user={user} />
                <div style={{'height': 0, 'width': '100px'}}></div>
                <Contact user={user} />
            </div>
            <div className='flex-layout'>
                <StatsCarousel case='questions' user={user} />
                <StatsCarousel case='answers' user={user} />
            </div>
            <PeriodQuestionsGen case='user' id={user.id} username={user.username} />
            <div style={{'marginTop': '-80px'}} />
            <PeriodQuestionsGen case='user-answered' id={user.id} username={user.username} />
        </div>
    )
}

export default ProfileMain;