import React, { useState, useEffect } from 'react';

import { getOneUser, isLogged } from '../../api';

import MyNavbar from '../../Navbar/MyNavbar';
import Footer from '../../Footer/Footer';
import DailyStats from './DailyStats';
import MonthlyStats from './MonthlyStats';

function StatsPage(props) {
    const [username, setUsername] = useState(null);
    const [err, setErr] = useState(false);

    useEffect(() => {
        if (props.case==='questions-user'||props.case==='all-user') {
            getOneUser(props.id)
            .then(response => {
                //console.log(response);
                setUsername(response.data.username);
                setErr(false);
            })
            .catch(err => {
                setErr(true);
            })
        }
    }, [props.id, props.case])

    useEffect(() => {
        isLogged()
        .then(() => {
            if (props.case === 'keyword') ;
        })
        .catch(() => {
            if (props.case === 'keyword') window.location.href = '/';
        })
    }, [props.case])

    return(
        <div className="all-page">
            <MyNavbar />
            <div style={{'paddingTop': '70px'}} />
                <div style= {{'paddingBottom': '100px'}}>
                    {props.case==='questions-user' &&
                        <div className="center-content margin-top-small flex-layout with-whitespace">
                            <h4>Questions statistics of </h4>
                            <a  href={`/users/${props.id}`}
                                style={{'fontSize': '1.5rem', 'marginTop': '-8px'}}>
                                {username}
                            </a>
                        </div>
                    }
                    {props.case==='all-user' &&
                        <div className="center-content margin-top-small flex-layout with-whitespace">
                            <h4>Statistics of </h4>
                            <a  href={`/users/${props.id}`}
                                style={{'fontSize': '1.5rem', 'marginTop': '-8px'}}>
                                {username}
                            </a>
                        </div>
                    }
                    {props.case==='questions-gen' &&
                        <h4 className="center-content margin-top-small">General Questions Statistics</h4>
                    }
                    {(props.case==='questions-gen'||props.case==='questions-user') &&
                        <div className="flex-layout">
                            <DailyStats case={props.case} id={props.id} username={username} />
                            <MonthlyStats case={props.case} id={props.id} username={username} />
                        </div>
                    }
                    {props.case==='all-user' &&
                        <div className="flex-layout">
                            <DailyStats case='questions-user' id={props.id} username={username} />
                            <MonthlyStats case='questions-user' id={props.id} username={username} />
                        </div>
                    }
                    {props.case==='all-user' &&
                        <div className="flex-layout">
                            <DailyStats case='answers-user' id={props.id} username={username} />
                            <MonthlyStats case='answers-user' id={props.id} username={username} />
                        </div>
                    }
                    { err &&
                        <div className="error-message margin-top">
                            Sorry, no data found.
                        </div>
                    
                    }
                </div>
            <Footer />
        </div>
    )
}

export default StatsPage;