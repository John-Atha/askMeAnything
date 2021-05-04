import React from 'react';
import './styles.css';

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

export default AnswerHeader;