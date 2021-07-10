import React, { useState, useEffect } from 'react';
import { getQuestionKeywords } from '../api';
import OneKeyword from './OneKeyword';

import './styles.css';

function QuestionKeywords(props) {
    const [id, setId] = useState(props.id);
    const [keywords, setKeywords] = useState([]);
    const [userId, setUserId] = useState(props.userId);

    useEffect(() => {
        setUserId(props.userId);
    }, [props.userId])

    useEffect(() => {
        setId(props.id);
    }, [props.id])

    useEffect(() => {
        getKeywords();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const getKeywords = () => {
        getQuestionKeywords(id)
        .then(async (response) => {
            //console.log(response);
            await setKeywords([]);
            setKeywords(response.data)
        })
        .catch(err => {
            console.log(err);
            setKeywords([]);
        })
    }

    return(
        <div className="margin-top-smaller flex-layout">
            {keywords.map((value, index) => {
                return(
                    <OneKeyword key={index}
                                id={value.id} 
                                name={value.name}
                                userId={userId}
                    />
                )
            })}
        </div>
    )
}

export default QuestionKeywords;