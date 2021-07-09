import React, { useState, useEffect } from 'react';

import { getOneKeyword, getOneUser } from '../api';

import MyNavbar from '../Navbar/MyNavbar';
import Footer from '../Footer/Footer';
import PeriodQuestionsGen from './PeriodQuestionsGen';

function PeriodQuestionsGenSkeleton(props) {
    const [username, setUsername] = useState(null);
    const [keywordName, setKeywordName] = useState(null);
    const [err, setErr] = useState(null);

    const getUser = () => {
        getOneUser(props.id)
        .then(response => {
            //console.log(response);
            setUsername(response.data.username);
            setErr(null);
        })
        .catch(err => {
            console.log(err);
            setErr('Sorry, we could not find the user you are looking for.');
        })
    }
    const getKeyword = () => {
        getOneKeyword(props.id)
        .then(response => {
            //console.log(response);
            setKeywordName(response.data.name);
            setErr(null);
        })
        .catch(err => {
            console.log(err);
            setErr('Sorry, we could not find the keyword you are looking for.');
        })
    }
    useEffect(() => {
        if (props.case==='user' || props.case==='user-answered') getUser();
        else if (props.case==='keyword') getKeyword();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.case])

    return(
        <div className="home-container">
            <MyNavbar />
            <div style={{'paddingTop': '70px'}} />
            {err &&
                <div className="margin-top error-message">
                    {err}
                </div>
            }
            {!err &&
                <PeriodQuestionsGen 
                    case={props.case}
                    id={props.id}
                    name={keywordName}
                    username={username} />
            }
            <Footer />
        </div>
    )
}

export default PeriodQuestionsGenSkeleton;