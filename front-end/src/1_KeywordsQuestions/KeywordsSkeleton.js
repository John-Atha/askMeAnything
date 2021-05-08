import React from 'react';

import KeywordsStatsOrAnals from './KeywordsStatsOrAnals';
import MyNavbar from '../Navbar/MyNavbar';
import Footer from '../Footer/Footer';

function KeywordsSkeleton(props) {
    return(
        <div className="home-container">
            <MyNavbar />
            <KeywordsStatsOrAnals case={props.case} />            
            <Footer />
        </div>
    )
}

export default KeywordsSkeleton;