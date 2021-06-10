import {React, useState, useEffect} from 'react';

import { isLogged } from '../api';

import OneQuestion from './OneQuestion';
import Button from 'react-bootstrap/Button';
import { getQuestions } from '../api';

function Latest() {
    const [questions, setQuestions] = useState([]);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(10);
    const [noData, setNoData] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        isLogged()
        .then(response => {
            console.log(response);
            setUserId(response.data.id);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    
    
    useEffect(()=> {
        console.log(`I am asking from ${start} to ${end}`);
        getQuestions(start, end)
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
        <div className="margin-top main-page" style={{'paddingBottom': '100px'}}>
            <h5>Latest Questions</h5>            
            {questions.map((value, index) => {
                return(
                    <OneQuestion key={index}
                                 id={value.id}
                                 owner={value.owner}
                                 date={value.created_at}
                                 title={value.title}
                                 text={value.text}
                                 upvotes={value.upvotesCount}
                                 answerChoice={true}
                                 userId={userId} />
                )
            })}
            {!noData && 
                <Button variant="outline-primary"
                        onClick={()=>{setStart(start+10);setEnd(end+10)}}>
                            See more
                </Button>
            }
            {noData && 
                <div className="margin-top-smaller error-message">Sorry, no more questions found.</div>
            }
        </div>
    )
}

export default Latest;