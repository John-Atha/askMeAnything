import React, { useState, useEffect } from 'react';

import { getAllKeywords } from '../api';

import KeywordQuestions from '../KeywordQuestions/KeywordQuestions';

import Button from 'react-bootstrap/Button';


function Keywords() {
    const [current, setCurrent] = useState(null);
    const [all, setAll] = useState([]);
    const [error, setError] = useState(false);

    const getAll = () => {
        getAllKeywords()
        .then(response=> {
            console.log(response);
            setAll(response.data);
            setError(!response.data.length);
        })
        .catch(err => {
            setError(true);
        }) 
    }

    useEffect(()=> {
        getAll();
    }, [])

    return(
        <div className="main-page">
            <div>
                {all.map((value, index) => {
                    return(
                        <Button key={index}
                                variant={current===value.id ? "success" : "primary"}
                                style={{'margin': '5px'}}
                                onClick={()=>{setCurrent(value.id)}}>
                            {value.name}
                        </Button>
                    )
                })}
            </div>
            <KeywordQuestions id={current} />
        </div>
    )
}

export default Keywords;