import React from 'react';

import '../generalStyles.css';
import './styles.css';

import MyNavbar from '../Navbar/MyNavbar';
import Footer from '../Footer/Footer';
import MainHome from './MainHome';
import MyHome from './MyHome';
import Latest from '../Questions/Latest';

function Home(props) {
    return(
        <div className="home-container">
            <MyNavbar />
                {props.case==="general" &&
                    <h5 className="main-page margin-top-smaller">Welcome to AskMeAnything</h5>        
                }
                {props.case==="my" &&
                    <h5 className="main-page margin-top-smaller">My AskMeAnything</h5>             
                }
                {props.case==="general" &&
                    <MainHome />
                }
                {props.case==="my" && 
                    <MyHome />            
                }
                <Latest />
            <Footer />
        </div>
    )
}

export default Home;