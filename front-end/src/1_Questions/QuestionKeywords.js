import React, { useState, useEffect } from 'react';
import { getQuestionKeywords } from '../api';
import OneKeyword from './OneKeyword';

import './styles.css';

function QuestionKeywords(props) {
    const [id, setId] = useState(props.id);
    const [keywords, setKeywords] = useState([]);

    useEffect(()=> {
        console.log(`I am asking for my keywords.`);
        getQuestionKeywords(id)
        .then(response => {
            console.log(response);
            setKeywords(response.data)
        })
        .catch(err => {
            console.log(err);
            setKeywords([]);
        })
    }, [])

    return(
        <div className="margin-top-smaller">
            {keywords.map((value, index) => {
                return(
                    <OneKeyword key={index}
                                id={value.id} 
                                name={value.name}
                    />
                )
            })}
        </div>
    )
}

export default QuestionKeywords;