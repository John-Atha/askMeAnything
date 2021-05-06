import React from 'react';

import Keywords from './Keywords';
import MyNavbar from '../../Navbar/MyNavbar';
import Footer from '../../Footer/Footer';

function KeywordsSkeleton() {
    return(
        <div className="home-container">
            <MyNavbar />
            <Keywords />
            <Footer />
        </div>
    )
}

export default KeywordsSkeleton;