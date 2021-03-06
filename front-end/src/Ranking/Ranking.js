import React from 'react';

import RankingMain from './RankingMain';
import MyNavbar from '../Navbar/MyNavbar';
import Footer from '../Footer/Footer';

function Ranking() {
    return(
        <div className="all-page" style={{'paddingBottom': '100px'}}>
            <MyNavbar />
            <div style={{'paddingTop': '70px'}} />
            <RankingMain />
            <Footer />
        </div>
    )
}

export default Ranking;