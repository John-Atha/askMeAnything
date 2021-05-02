import React from 'react';
import AddMain from './AddMain';
import MyNavbar from '../Navbar/MyNavbar';
import Footer from '../Footer/Footer';

function AddSkeleton(props) {
    return(
        <div className="all-page">
            <MyNavbar />
            <h5 className="margin-left margin-top-smaller">Answer question</h5>
            <AddMain id={props.id}/>
            <Footer />
        </div>
    )
}

export default AddSkeleton;