import React, { useState, useEffect } from 'react';

import { getOneKeyword } from '../../api';

import '../../generalStyles.css';
import './styles.css';

import MyNavbar from '../../Navbar/MyNavbar';
import Footer from '../../Footer/Footer';
import KeywordQuestions from './KeywordQuestions';

function KeywordSkeleton(props) {

    const [id, setId] = useState(parseInt(props.id));
    const [name, setName] = useState(null);
    const [keywordErr, setKeywordErr] = useState(false);

    const getKeyword = () => {
        getOneKeyword(props.id)
        .then(response => {
            console.log(response);
            setName(response.data.name);
            setKeywordErr(false);
        })
        .catch(err => {
            console.log(err);
            setKeywordErr(true);
        })
    }

    useEffect(() => {
        getKeyword();
    }, [])

    return(
        <div className="home-container">
            <MyNavbar />
                {!keywordErr &&
                    <KeywordQuestions id={props.id} name={name} />
                }
                {keywordErr &&
                    <div className="error-message margin-top">Sorry, keyword {name} was not found.</div>
                }
            <Footer />
        </div>
    )
}

export default KeywordSkeleton;