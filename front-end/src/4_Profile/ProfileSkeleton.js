import React ,  { useState, useEffect } from 'react';

import { getOneUser } from '../api';

import ProfileMain from './ProfileMain';
import MyNavbar from '../Navbar/MyNavbar';
import Footer from '../Footer/Footer';


function ProfileSkeleton(props) {
    const [user, setUser] = useState({});
    const [userErr, setUserErr] = useState(false);
    
    useEffect(() => {
        getOneUser(props.id)
        .then(response => {
            console.log(response);
            setUser(response.data);
        })
        .catch(err => {
            setUserErr(true);
        })
    }, [props.id])


    return(
        <div className="all-page">
            <MyNavbar />
            {userErr &&
                <div className="margin-top-small error-message center-content">
                    Sorry, user was not found.
                </div>
            }
            {!userErr &&
                <ProfileMain user={user} />
            }
            <Footer />
        </div>
    );
}

export default ProfileSkeleton;