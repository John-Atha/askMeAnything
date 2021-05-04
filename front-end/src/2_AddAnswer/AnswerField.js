import React, { useState } from 'react';

import { isLogged, Answer } from '../api';
import { createNotification } from '../createNotification'; 

import Button from 'react-bootstrap/Button';
import './styles.css';

function AnswerField(props) {
    const [text, setText] = useState("");

    const submit = () => {
        if (!text.length) {
            createNotification('danger', 'Sorry,', 'You cannot post an empty answer.');
        }
        else {
            isLogged()
            .then(response=> {
                Answer(text, props.id)
                .then(response => {
                    console.log(response);
                    createNotification('success', 'Hello,', 'Answer posted successfully.');
                })
                .catch(err => {
                    console.log(err);
                    createNotification('danger', 'Sorry,', 'We could not post your answer.');
                })
            })
            .catch(err => {
                createNotification('danger', 'Sorry,', 'You cannot post an answer without an account.');
            })    
        }
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