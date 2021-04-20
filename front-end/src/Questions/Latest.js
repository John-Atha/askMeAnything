import {React, useState} from 'react';
import OneQuestion from './OneQuestion';

function Latest() {
    const [questions, setQuestions] = useState([
        {
            "owner": {
                "name": "John",
            },
            "title": "Insert in Django",
            "date": "2020-02-03 10:00:00",
            "text": "How do I insert data in Django?",
        },
        {
            "owner": {
                "name": "John",
            },
            "title": "Insert in Django",
            "date": "2020-02-03 10:00:00",
            "text": "How do I insert data in Django?",
        },
        {
            "owner": {
                "name": "John",
            },
            "title": "Insert in Django",
            "date": "2020-02-03 10:00:00",
            "text": "How do I insert data in Django?",
        },
    ])
    return(
        <div className="margin-top-smaller main-page" style={{'paddingBottom': '100px'}}>
            <h5>Latest Questions</h5>            
            {questions.map((value, index) => {
                return(
                    <OneQuestion key={index}
                                 owner={value.owner}
                                 date={value.date}
                                 title={value.title}
                                 text={value.text} />
                )
            })}
            {!questions.length && 
                <div className="margin-top-smaller error-message">Sorry, no questions found.</div>
            }
        </div>
    )
}

export default Latest;