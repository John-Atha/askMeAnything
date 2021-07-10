import React, { useEffect } from 'react';

import KeywordsStatsOrAnals from './KeywordsStatsOrAnals';
import MyNavbar from '../Navbar/MyNavbar';
import Footer from '../Footer/Footer';
import { isLogged } from '../api';

function KeywordsSkeleton(props) {

    useEffect(() => {
        isLogged()
        .then(() => {
            ;
        })
        .catch(() => {
            window.location.href='/';
        })
    }, [])

    return(
        <div className="home-container">
            <MyNavbar />
            <div style={{'paddingTop': '70px'}} />
            <KeywordsStatsOrAnals case={props.case} />
            <div style={{'paddingBottom': '100px'}} />
            <Footer />
        </div>
    )
}

export default KeywordsSkeleton;