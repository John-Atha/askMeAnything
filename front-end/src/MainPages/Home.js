import React from 'react';

import '../generalStyles.css';
import './styles.css';
import Button from 'react-bootstrap/Button';

import MyNavbar from '../Navbar/MyNavbar';
import Title from '../Title';
import MainHome from './MainHome';
import MyHome from './MyHome';

/*function LogActions() {
    return (
        <div className="bordered margin padding center-content">
            <a href="/login">Login</a>
            <div className="break" />
            <a href="/register">Register</a>
        </div>
    )
}

function Header() {
    return(
        <div className="header">
            <div className="flex-layout">
                <Title position="home" />
                <LogActions />
            </div>
            <h5 className="margin-left">Welcome to Ask Me Anything</h5>
        </div>
    )
}*/


function Home(props) {
    return(
        <div className="home-container">
            <MyNavbar />
            <h5 className="margin-top-smaller margin-left">Welcome to AskMeAnything</h5>
            {props.case==="general" &&
                <MainHome />
            }
            {props.case==="my" && 
                <MyHome />            
            }
        </div>
    )
}

export default Home;