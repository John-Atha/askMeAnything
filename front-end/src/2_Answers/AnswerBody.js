import React from 'react';

import './styles.css';

function AnswerBody(props) {
    return(
        <div style={{'marginTop': '15px'}}>
            <div className="with-whitespace">{props.text}</div>
        </div>
    )
}

export default AnswerBody;