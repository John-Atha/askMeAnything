import React from 'react';

import MyNavbar from '../Navbar/MyNavbar';
import Footer from '../Footer/Footer';
import PeriodsQuestions from './PeriodsQuestions';

function PeriodsSkeleton() {
    return(
        <div className="home-container">
            <MyNavbar />
            <PeriodsQuestions />
            <Footer />
        </div>
    )
}

export default PeriodsSkeleton;