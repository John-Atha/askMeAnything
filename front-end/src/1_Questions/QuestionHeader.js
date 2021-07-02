import React from 'react';
import './styles.css';

import { createNotification } from '../createNotification';

function QuestionHeader(props) {
    /*const [owner, setOwner] = useState(props.owner);
    const [date, setDate] = useState(props.date);
    const [title, setTitle] = useState(props.title);*/

    const goToOwner = () => {
        if (props.userId) window.location.href = `/users/${props.owner.id}`;
        else createNotification('danger', 'Sorry', 'You cannot visit another user\'s profile page without an account.');
    }

    return(
        <div style={{'width': '80%'}}>
            <div className="question-title break-lines">{props.title[0].toUpperCase()+(props.title.slice(1))}</div>
            <div className="flex-layout">
                <div className="with-whitespace">Asked by </div>
                <button onClick={goToOwner} className='button-as-link-2'>{props.owner.username}</button>
                <div>, on {props.date.slice(0, props.date.length-14)}</div>
            </div>
        </div>
    )
}

export default QuestionHeader;