import React from 'react';
import './styles.css';

function AnswerHeader(props) {
    return(
        <div className="margin-left">
            <a href={`/users/${props.owner.id}`}>{props.owner.username}</a>
            <div className='break' />
            <div className='flex-layout'>
                <div style={{'fontSize': '15px'}} className="with-whitespace">on </div>
                <div style={{'fontSize': '15px'}}> {props.date.slice(0, props.date.length-14)}</div>
            </div>
        </div>   
    )
}

export default AnswerHeader;