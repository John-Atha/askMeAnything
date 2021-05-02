import {React, useState} from 'react';

import { isLogged } from '../api';
import { createNotification } from '../createNotification';

import Answers from '../2_Answers/Answers';
import QuestionHeader from './QuestionHeader';
import QuestionBody from './QuestionBody';
import QuestionUpvotes from './QuestionUpvotes';
import QuestionKeywords from './QuestionKeywords';


import './styles.css';
import Button from 'react-bootstrap/Button';

function OneQuestion(props) {
    /*const [owner, setOwner] = useState(props.owner);
    const [date, setDate] = useState(props.date);
    const [title, setTitle] = useState(props.title);
    const [text, setText] = useState(props.text);
    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [id, setId] = useState(props.id);*/

    const answer = () => {
        isLogged()
        .then(response => {
            window.location.href=`/answer/${props.id}`;
        })
        .catch(err => {
            createNotification('danger', 'Sorry,', 'You cannot add an answer without an account');
        })
    }

    return(
        <div className="one-question-container flex-layout">
            <QuestionUpvotes upvotes={props.upvotes} />
            <div>
                <QuestionHeader owner={props.owner} date={props.date} title={props.title} />
                <hr></hr>
                <QuestionBody text={props.text} />
                <QuestionKeywords id={props.id} />
            </div>
            <div className="break"></div>
            <Answers id={props.id} />
            <div className="break"></div>
            {props.answerChoice &&
            <Button variant="outline-primary" 
                    className="margin-top-smaller"
                    style={{'position': 'absolute', 'right': '20px'}}
                    onClick={answer}>
                    Answer
            </Button>
            }
        </div>
    )
}

export default OneQuestion;