import {React, useState} from 'react';
import Answers from '../Answers/Answers';

import './styles.css';
import arrow1 from '../images/arrow1.png'

function QuestionHeader(props) {
    /*const [owner, setOwner] = useState(props.owner);
    const [date, setDate] = useState(props.date);
    const [title, setTitle] = useState(props.title);*/
    return(
        <div>
            <div className="question-title">{props.title[0].toUpperCase()+(props.title.slice(1))}</div>
            <div className="flex-layout">
                <div className="with-whitespace">Asked by </div>
                <a href="#">{props.owner.username}</a>
                <div>, on {props.date.slice(0, props.date.length-14)}</div>
            </div>
        </div>
    )
}
function QuestionUpvotes(props) {
    const [upvotes, setUpvotes] = useState(props.upvotes);
    return(
        <div className="center-content">
            <img className="upvotes-icon" src={arrow1} alt="upvotes" />
            <div style={{'fontSize': '30px'}} className="center-content">{upvotes}</div>
        </div>
    )
}
function QuestionBody(props) {
    //const [text, setText] = useState(props.text);
    return(
        <div style={{'marginTop': '15px'}}>
            <div>{props.text}</div>
        </div>
    )
}
function OneQuestion(props) {
    /*const [owner, setOwner] = useState(props.owner);
    const [date, setDate] = useState(props.date);
    const [title, setTitle] = useState(props.title);
    const [text, setText] = useState(props.text);
    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [id, setId] = useState(props.id);*/

    return(
        <div className="one-question-container flex-layout">
            <QuestionUpvotes upvotes={props.upvotes} />
            <div>
                <QuestionHeader owner={props.owner} date={props.date} title={props.title} />
                <hr></hr>
                <QuestionBody text={props.text} />
            </div>
            <div className="break"></div>
            <Answers id={props.id} />
        </div>
    )
}

export default OneQuestion;