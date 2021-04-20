import {React, useState} from 'react';
import './styles.css';

function QuestionHeader(props) {
    const [owner, setOwner] = useState(props.owner);
    const [date, setDate] = useState(props.date);
    const [title, setTitle] = useState(props.title);
    return(
        <div>
            <div className="question-title">{title}</div>
            <div className="flex-layout">
                <div className="with-whitespace">Asked by </div>
                <a href="#">{owner.name}</a>
                <div>, on {date}</div>
            </div>
        </div>
    )
}
function QuestionBody(props) {
    const [text, setText] = useState(props.text);
    return(
        <div style={{'marginTop': '15px'}}>{text}</div>
    )
}


function OneQuestion(props) {
    const [owner, setOwner] = useState(props.owner);
    const [date, setDate] = useState(props.date);
    const [title, setTitle] = useState(props.title);
    const [text, setText] = useState(props.text);
    

    return(
        <div className="one-question-container">
            <QuestionHeader owner={owner} date={date} title={title} />
            <hr></hr>
            <QuestionBody text={text} />
        </div>
    )
}

export default OneQuestion;