import React from 'react';
import './styles.css';

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

export default QuestionHeader;