import React , { useState } from 'react';

import './styles.css';
import arrow1 from '../images/arrow1.png'

function AnswerHeader(props) {
    return(
        <div>
            <div className="flex-layout">
                <a href="#">{props.owner.username}</a>
                <div style={{'fontSize': '15px'}} className="with-whitespace"> on </div>
                <div style={{'fontSize': '15px'}}> {props.date.slice(0, props.date.length-14)}</div>
            </div>   
        </div>
    )
}

function AnswerUpvotes(props) {
    const [upvotes, setUpvotes] = useState(props.upvotes);
    return(
        <div className="center-content">
            <img className="upvotes-icon-small" src={arrow1} alt="upvotes" />
            <div style={{'fontSize': '20px'}} className="center-content">{upvotes}</div>
        </div>
    )
}

function AnswerBody(props) {
    return(
        <div style={{'marginTop': '15px'}}>
            <div className="with-whitespace">{props.text}</div>
        </div>
    )
}

function OneAnswer(props) {
    /*const [owner, setOwner] = useState(props.owner);
    const [text, setText] = useState(props.text);
    const [date, setDate] = useState(props.date);*/

    return(
        <div className="one-answer-container bordered-input flex-layout padding-bottom">
            <AnswerUpvotes upvotes={props.upvotes} />
            <div style={{'marginLeft': '10px'}}>
                <AnswerHeader owner={props.owner} date={props.date} />
                <hr></hr>
                    <AnswerBody text={props.text} />
            </div>
        </div>
    )
}

export default OneAnswer;