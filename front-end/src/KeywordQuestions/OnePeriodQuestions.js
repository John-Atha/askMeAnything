import {React, useState, useEffect} from 'react';

import { getKeywordQuestionsPeriod } from '../api';

import OneQuestion from '../1_Questions/OneQuestion';
import Button from 'react-bootstrap/Button';

function OnePeriodQuestions(props) {
    const [questions, setQuestions] = useState([]);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(5);
    const [noData, setNoData] = useState(false);
  
    useEffect(()=> {
        console.log(`I am asking from ${start} to ${end}`);
        getKeywordQuestionsPeriod(props.id, start, end, props.monthNum, props.year)
        .then(response => {
            console.log(response);
            if (response.data.length) {
                setQuestions(questions.concat(response.data));
                setNoData(false);
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


    return(
        <div className="margin-top-smaller main-page" style={{'paddingBottom': '100px'}}>
            {
                <h6>{props.month} {props.year}</h6>
            }
            {questions.map((value, index) => {
                return(
                    <OneQuestion key={index}
                                 id={value.id}
                                 owner={value.owner}
                                 date={value.updated_at}
                                 title={value.title}
                                 text={value.text}
                                 upvotes={value.upvotesCount}
                                 answerChoice={true}
                                 userId={props.userId} />
                )
            })}
            {!noData && 
                <Button variant="outline-primary"
                        onClick={()=>{setStart(start+5);setEnd(end+5)}}>
                            See more
                </Button>
            }
            {noData && 
                <div className="margin-top-smaller error-message">Sorry, no more questions found.</div>
            }
        </div>
    )
}

export default OnePeriodQuestions;