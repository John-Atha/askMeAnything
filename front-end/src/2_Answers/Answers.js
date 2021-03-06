import React, { useState, useEffect } from 'react';
import OneAnswer from './OneAnswer';
import { getQuestionAnswers } from '../api';

import './styles.css';
import Button from 'react-bootstrap/Button';

function Answers (props) {
    const [questionId, setQuestionId] = useState(props.id);
    const [answers, setAnswers] = useState([]);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(5);
    const [noData, setNoData] = useState(false);
    const [userId, setUserId] = useState(props.userId);
    const [show, setShow] = useState(false);

    useEffect(() => {
        console.log('I update question id');
        setQuestionId(props.id);
    }, [props.id])

    useEffect(() => {
        setUserId(props.userId);
    }, [props.userId])

    useEffect(() => {
        console.log('I empty answers and update start, end');
        setStart(1);
        setEnd(5);
        console.log('I am asking answers-2');
        getAnswers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionId])

    useEffect(()=> {
        console.log('I am asking answers');
        getAnswers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start, end])

    const getAnswers = () => {
        getQuestionAnswers(questionId, start, end)
        .then(response => {
            console.log(`for ${questionId}`);
            console.log(response);
            if (response.data.length) {
                if (start===1) {
                    setAnswers([])
                    setTimeout(()=>{setAnswers(response.data)}, 200);
                }
                else setAnswers(answers.concat(response.data));
                setNoData(response.data.length<5 ? true : false);
            }
            else {
                if (start===1) setAnswers([]);
                setNoData(true);
            }
        })
        .catch(err => {
            console.log(err);
            setNoData(true);
        })
    }
    
    if (answers.length) {
        return(
            <div className="answers-container bordered-input margin-top-smaller">
                {!show &&
                    <div className="success-message">
                        {answers.length%5===0 ? `${answers.length}+` : answers.length} answer{answers.length>1 ? 's' : ''} posted
                    </div>
                }
                {!show &&
                    <Button className="margin-top-smaller" variant="outline-success" onClick={()=>setShow(true)}>See answers</Button>            
                }   
                {show && answers.map((value, index) => {
                    return(
                        <OneAnswer key={index}
                                id={value.id} 
                                owner={value.owner}
                                text={value.text}
                                date={value.created_at}
                                upvotes={value.upvotesCount}
                                userId={userId} />
                    )
                })}
                {show && !noData &&
                    <div className="flex-layout">
                        <Button className="margin" variant="outline-primary" onClick={()=>{setStart(start+5);setEnd(end+5);}}>See more</Button>            
                        <Button className="margin" variant="outline-danger" onClick={()=>setShow(false)}>Hide</Button>
                    </div>

                }
                {show && noData &&
                    <Button variant="outline-danger" onClick={()=>setShow(false)}>Hide answers</Button>            
                }
            </div>
        )    
    }
    else {
        return(
            <div className="error-message margin-top-small">No answers have been posted yet</div>
        )
    }
}

export default Answers;