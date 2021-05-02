import React from 'react';

import './styles.css';

function QuestionBody(props) {
    //const [text, setText] = useState(props.text);
    return(
        <div style={{'marginTop': '15px'}}>
            <div className="with-whitespace">{props.text}</div>
        </div>
    )
}

export default QuestionBody;