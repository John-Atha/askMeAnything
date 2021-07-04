import React, { useState, useEffect } from 'react';

import AnswerHeader from './AnswerHeader';
import AnswerUpvotes from './AnswerUpvotes';
import AnswerBody from './AnswerBody';

import './styles.css';

function OneAnswer(props) {
    const [userId, setUserId] = useState(props.userId);

    useEffect(() => {
        setUserId(props.userId);
    }, [props.userId])

    return(
        <div className="one-answer-container bordered-input flex-layout padding-bottom">
            <AnswerUpvotes upvotes={props.upvotes} id={props.id} userId={userId} />
            <AnswerHeader owner={props.owner} date={props.date} userId={userId} />
            <div className='break' />
            <div style={{'marginLeft': '10px'}}>
                <hr></hr>
                    <AnswerBody text={props.text} />
            </div>
        </div>
    )
}

export default OneAnswer;