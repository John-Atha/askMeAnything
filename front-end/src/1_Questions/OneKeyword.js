import React from 'react';
import { createNotification } from '../createNotification';

function OneKeyword(props) {
    
    return(
        <a  href={`/keywords/${props.id}`}
            className="keyword-pill"
            onClick={(event) => {
                if (!props.userId) {
                    event.preventDefault();
                    createNotification('danger', 'Sorry', 'You cannot visit a keyword\'s page without an account.');
                }
            }}
            >
            {props.name}
        </a>
    )
}

export default OneKeyword;