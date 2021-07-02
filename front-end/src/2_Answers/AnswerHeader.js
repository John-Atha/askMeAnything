import React, { useState, useEffect } from 'react';
import { createNotification } from '../createNotification';
import './styles.css';

function AnswerHeader(props) {
    const [userId, setUserId] = useState(props.userId);

    useEffect(() => {
        setUserId(props.userId);
    }, [props.userId])

    const goToOwner = () => {
        if (userId) window.location.href = `/users/${props.owner.id}`;
        else createNotification('danger', 'Sorry', 'You cannot visit another user\'s profile page without an account.');
    }

    return(
        <div className="margin-left">
            <button onClick={goToOwner} className='button-as-link-2' >{props.owner.username}</button>
            <div className='break' />
            <div className='flex-layout'>
                <div style={{'fontSize': '15px'}} className="with-whitespace">on </div>
                <div style={{'fontSize': '15px'}}> {props.date.slice(0, props.date.length-14)}</div>
            </div>
        </div>   
    )
}

export default AnswerHeader;