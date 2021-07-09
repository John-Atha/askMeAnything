import React from 'react';
import MyNavbar from '../Navbar/MyNavbar';
import Footer from '../Footer/Footer';
import Main from './Main';

function AskSkeleton() {
    return(
        <div className="all-page">
            <MyNavbar />
            <div style={{'paddingTop': '70px'}} />
            <h5 className="margin-left margin-top-smaller">Ask a question</h5>
            <Main />
            <Footer />
        </div>
    )
}

export default AskSkeleton;