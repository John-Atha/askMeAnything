import React, { useState, useEffect } from 'react';

import { getUserQuestionsPeriod } from '../api';

import OneQuestion from '../1_Questions/OneQuestion';
import Button from 'react-bootstrap/Button';
import arrow_up from '../images/arrow1.png';
import arrow_down from '../images/arrow_down.png';
import '../1_KeywordsQuestions/OneKeywordQuestions/styles.css';


function OnePeriodQuestions(props) {
    const [id, setId] = useState(props.id);
    const [questions, setQuestions] = useState([]);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(5);
    const [noData, setNoData] = useState(false);
    const [showData, setShowData] = useState(false);

    useEffect(() => {
        setId(props.id);
    }, [props.id])

    const getAnalytics = (curr_id) => {
        getUserQuestionsPeriod(curr_id, start, end, props.monthNum, props.year)
        .then(response => {
            console.log(response);
            setQuestions(questions.concat(response.data));
            setNoData(!response.data.length);
        })
        .catch(err => {
            console.log(err);
            setNoData(true);
        })
    }

    useEffect(() => {
        getAnalytics(props.id);
    }, [start, end])

    return(
        <div className="margin-top-smaller main-page">
            
            <button className="menu"
                        onClick={()=>{setShowData(!showData)}}>
                <div>
                    {`${props.month} ${props.year}`}
                </div>
                <img  className="menu-arrow" 
                        src={showData ? arrow_up : arrow_down}
                        alt='arrow' />
            </button>
            
            { showData &&
                    <div className="show-animated">
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
                        { showData && !noData && 
                            <Button variant="outline-primary"
                                    onClick={()=>{setStart(start+5);setEnd(end+5)}}>
                                        See more
                            </Button>
                        }
                        {showData && noData && 
                            <div className="margin-top-smaller error-message">Sorry, no more questions found.</div>
                        }
                    </div>
            }
        </div>
    )






}

export default OnePeriodQuestions;