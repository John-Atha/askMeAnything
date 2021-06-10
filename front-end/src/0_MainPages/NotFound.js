import React from 'react';
import MyNavbar from '../Navbar/MyNavbar';
import Footer from '../Footer/Footer';
import './styles.css';

function NotFound() {
    return(
        <div className='main-page'>
            <MyNavbar />
            <div className='error-message margin-top center-content'>Sorry, page not found.</div>
            <div style={{'paddingBottom': '100px'}} />
            <Footer />
        </div>
    )
}

export default NotFound;