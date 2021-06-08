import React from 'react';

import AnswerHeader from './AnswerHeader';
import AnswerUpvotes from './AnswerUpvotes';
import AnswerBody from './AnswerBody';

import './styles.css';

function OneAnswer(props) {

    return(
        <div className="one-answer-container bordered-input flex-layout padding-bottom break-text">
            <AnswerUpvotes upvotes={props.upvotes} id={props.id} userId={props.userId} />
            <div style={{'marginLeft': '10px'}}>
                <AnswerHeader owner={props.owner} date={props.date} />
                <hr></hr>
                    <AnswerBody text={props.text} />
            </div>
        </div>
    )
}

export default OneAnswer;