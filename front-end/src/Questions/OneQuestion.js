import {React, useState} from 'react';
import './styles.css';
import arrow1 from '../images/arrow1.png'

function QuestionHeader(props) {
    const [owner, setOwner] = useState(props.owner);
    const [date, setDate] = useState(props.date);
    const [title, setTitle] = useState(props.title);
    return(
        <div>
            <div className="question-title">{title[0].toUpperCase()+(title.slice(1))}</div>
            <div className="flex-layout">
                <div className="with-whitespace">Asked by </div>
                <a href="#">{owner.username}</a>
                <div>, on {date.slice(0, date.length-14)}</div>
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
    const [text, setText] = useState(props.text);
    const [upvotes, setUpvotes] = useState(props.upvotes);
    return(
        <div style={{'marginTop': '15px'}}>
            <div>{text}</div>
        </div>
    )
}
function OneQuestion(props) {
    const [owner, setOwner] = useState(props.owner);
    const [date, setDate] = useState(props.date);
    const [title, setTitle] = useState(props.title);
    const [text, setText] = useState(props.text);
    const [upvotes, setUpvotes] = useState(props.upvotes);

    return(
        <div className="one-question-container flex-layout">
            <QuestionUpvotes upvotes={upvotes} />
            <div>
                <QuestionHeader owner={owner} date={date} title={title} />
                <hr></hr>
                <QuestionBody text={text} upvotes={upvotes} />
            </div>
        </div>
    )
}

export default OneQuestion;