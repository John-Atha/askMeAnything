import React, { useState } from 'react';

import './styles.css';
import arrow1 from '../images/arrow1.png'

function QuestionUpvotes(props) {
    const [upvotes, setUpvotes] = useState(props.upvotes);
    return(
        <div className="center-content">
            <img className="upvotes-icon" src={arrow1} alt="upvotes" />
            <div style={{'fontSize': '30px'}} className="center-content">{upvotes}</div>
        </div>
    )
}

export default QuestionUpvotes;