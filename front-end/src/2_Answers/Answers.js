import React, { useState, useEffect } from 'react';
import OneAnswer from './OneAnswer';
import { getQuestionAnswers } from '../api';

import './styles.css';
import Button from 'react-bootstrap/Button';

function Answers (props) {
    //const [questionId, setQuestionId] = useState(props.id);
    const [answers, setAnswers] = useState([]);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(5);
    const [noData, setNoData] = useState(false);


    useEffect(()=> {
        getQuestionAnswers(props.id, start, end)
        .then(response=> {
            //console.log(response);
            if (response.data.length) {
                setAnswers(answers.concat(response.data));
                setNoData(response.data.length<5 ? true : false);
            }
            else {
                setNoData(true);
            }
        })
        .catch(err => {
            console.log(err);
            setNoData(true);
        })
    }, [start, end])

    
    if (answers.length) {
        return(
            <div className="answers-container bordered-input margin-top-smaller">
                {answers.map((value, index) => {
                    return(
                        <OneAnswer key={index}
                                id={value.id} 
                                owner={value.owner}
                                text={value.text}
                                date={value.updated_at}
                                upvotes={value.upvotesCount}
                                userId={props.userId} />
                    )
                })}
                { !noData &&
                    <Button variant="outline-primary" onClick={()=>{setStart(start+5);setEnd(end+5);}}>See more</Button>            
                }
            </div>
        )    
    }
    else {
        return(
            <div className="error-message">No answers have been posted yet</div>
        )
    }
}

export default Answers;