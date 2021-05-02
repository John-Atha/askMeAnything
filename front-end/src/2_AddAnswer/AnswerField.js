import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import './styles.css';

function AnswerField(props) {
    const [text, setText] = useState("");

    const submit = () => {

    }


    return(
        <div>
            <h5 style={{'fontWeight': 'bold'}}>Your answer</h5>
            <textarea className="answer-textarea" value={text} onChange={(event)=>{setText(event.target.value)}} />
            <div className="flex-layout" style={{'position': 'absolute', 'right': '10px', 'bottom': '-60px'}}>
                <Button style={{'margin': '10px'}} variant="outline-primary" onClick={submit}>Submit</Button>
                <Button style={{'margin': '10px'}} variant="outline-danger" onClick={() => {setText("");}}>Clear</Button>
            </div>

        </div>
    )
}

export default AnswerField;