import React, { useState } from 'react';

import './styles.css';
import arrow1 from '../images/arrow1.png';
import arrow1_blue from '../images/arrow1_blue.png';

function AnswerUpvotes(props) {
    const [upvotes, setUpvotes] = useState(props.upvotes);
    return(
        <div className="center-content">
            <img className="upvotes-icon-small" src={arrow1} alt="upvotes" />
            <div style={{'fontSize': '20px'}} className="center-content">{upvotes}</div>
        </div>
    )
}

export default AnswerUpvotes;