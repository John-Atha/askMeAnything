import React, { useState, useEffect } from 'react';

import { createNotification } from '../createNotification';

import Answers from '../2_Answers/Answers';
import QuestionHeader from './QuestionHeader';
import QuestionBody from './QuestionBody';
import QuestionUpvotes from './QuestionUpvotes';
import QuestionKeywords from './QuestionKeywords';


import './styles.css';
import Button from 'react-bootstrap/Button';

function OneQuestion(props) {
    const [owner, setOwner] = useState(props.owner);
    const [date, setDate] = useState(props.date);
    const [title, setTitle] = useState(props.title);
    const [text, setText] = useState(props.text);
    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [id, setId] = useState(props.id);
   
    const [userId, setUserId] = useState(props.userId);
    
    useEffect(() => {
        setUserId(props.userId);
    }, [props.userId])
    useEffect(() => {
        setOwner(props.owner);
    }, [props.owner])
    useEffect(() => {
        setDate(props.date);
    }, [props.date])
    useEffect(() => {
        setTitle(props.title);
    }, [props.title])
    useEffect(() => {
        setText(props.text);
    }, [props.text])
    useEffect(() => {
        setUpvotes(props.upvotes);
    }, [props.upvotes])
    useEffect(() => {
        setId(props.id);
    }, [props.id])

    const answer = () => {
        if (props.userId) {
            window.location.href=`/questions/${props.id}`;
        }
        else {
            createNotification('danger', 'Sorry,', 'You cannot add an answer without an account');
        }
    }

    return(
        <div className="one-question-container flex-layout">
            <QuestionUpvotes upvotes={upvotes} userId={userId} id={id} />
            <QuestionHeader owner={owner} date={date} title={title} userId={userId} />
            <div className="break"></div>
            <div style={{'width': '100%'}}>
                <hr></hr>
                <QuestionBody text={text} />
                <QuestionKeywords id={id} />
            </div>
            <div className="break"></div>
            <Answers id={id} userId={userId} />
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