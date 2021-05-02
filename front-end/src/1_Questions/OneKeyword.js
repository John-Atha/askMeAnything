import React from 'react';

function OneKeyword(props) {
    return(
        <a href={`/keywords/${props.id}`} className="keyword-pill">
            {props.name}
        </a>
    )
}

export default OneKeyword;