import {React, useState, useEffect} from 'react';

import { getKeywordQuestionsPeriod, getGeneralQuestionsPeriod, getUserQuestionsPeriod, getUserAnsweredPeriod } from '../api';

import OneQuestion from '../1_Questions/OneQuestion';
import Button from 'react-bootstrap/Button';
import arrow_up from '../images/arrow1-big.png';
import arrow_down from '../images/arrow_down.png';
import './styles.css';

function OnePeriodQuestionsGen(props) {

    const [questions, setQuestions] = useState([]);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(3);
    const [noData, setNoData] = useState(false);
    const [showData, setShowData] = useState(true);

    const getAnalytics = () => {
        let func = getGeneralQuestionsPeriod;
        switch(props.case) {
            case 'user':
                func = getUserQuestionsPeriod;
                break;
            case 'keyword':
                func = getKeywordQuestionsPeriod;
                break;
            case 'user-answered':
                func = getUserAnsweredPeriod;
                break;
            default:
                break;
        }
        console.log(`Asking for questions ${props.id} with start: ${start} and end:${end}`);
        func(props.id, start, end, props.monthNum, props.year)
        .then(response => {
            console.log(response);
            if (response.data.length) {
                //console.log(`At month ${props.monthNum}:`);
                //console.log(response.data);
                setQuestions(questions.concat(response.data));
                setNoData(!response.data.length);
            }
            else {
                setNoData(true);
            }
        })
        .catch(err => {
            console.log(err);
            setNoData(true);
        })
    }

    useEffect(()=> {
       getAnalytics();
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start])


    return(
        <div className="margin-top-smaller main-page">
            
            <button className="menu"
                        onClick={()=>{setShowData(!showData)}}>
                <div>
                    {`${props.month} ${props.year} (${props.count})`}
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
                        { showData && !noData && questions.length<props.count &&
                            <Button variant="outline-primary"
                                    onClick={()=>{setStart(start+3);setEnd(end+3);}}>
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

export default OnePeriodQuestionsGen;