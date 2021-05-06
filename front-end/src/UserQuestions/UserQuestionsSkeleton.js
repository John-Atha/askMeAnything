import React, { useState, useEffect } from 'react';

import { getOneUser } from '../api';

import MyNavbar from '../Navbar/MyNavbar';
import Footer from '../Footer/Footer';
import UserQuestions from './UserQuestions';

function UserQuestionsSkeleton(props) {

    const [username, setUsername] = useState(null);
    const [err, setErr] = useState(false);

    useEffect(() => {
        getUser();
    }, [])


    const getUser = () => {
        getOneUser(props.id)
        .then(response => {
            console.log(response);
            setUsername(response.data.username);
            setErr(false);
        })
        .catch(err => {
            console.log(err);
            setErr(true);
        })
    }

    return(
        <div className="home-container">
            <MyNavbar />
            {err &&
                <div className="margin-top error-message">
                    Sorry, we could not find the user you are looking for.
                </div>
            }
            {!err &&
                <UserQuestions id={props.id} username={username} />
            }
            <Footer />
        </div>
    )
}

export default UserQuestionsSkeleton;