import React from 'react';

import Contact from './Contact';
import Basics from './Basics';

import './styles.css';



function ProfileMain(props) {
    return(
        <div className="margin-top-smaller">
            <Basics user={props.user} />
            <Contact user={props.user} />
        </div>
    )
}

export default ProfileMain;