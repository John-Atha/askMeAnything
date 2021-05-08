import React, { useState, useEffect } from 'react';

import { getOneKeyword } from '../api';

import PeriodQuestionsGen from '../PeriodQuestionsGen/PeriodQuestionsGen';
import QuestionsStats from '../3_Statistics/Pages/QuestionsStats';
import MyNavbar from '../Navbar/MyNavbar';
import Footer from '../Footer/Footer';

function KeywordPage(props) {
    const [name, setName] = useState(null);

    useEffect(() => {
        getOneKeyword(props.id)
        .then(response => {
            setName(response.data.name);
        })
    }, [])

    return(
        <div className="home-container">
            <MyNavbar />
            {name &&
                <div className="margin-top-small">
                    <PeriodQuestionsGen case='keyword' id={props.id} name={name} />
                    <QuestionsStats case='keyword' id={props.id} name={name} />
                </div>
            }
            {!name &&
                <div className="error-message margin-top-small">
                    Sorry, could not find the keyword you are looking for
                </div>
            }
            <Footer />
        </div>
    )
}

export default KeywordPage;