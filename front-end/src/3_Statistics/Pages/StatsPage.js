import React, { useState, useEffect } from 'react';

import { getOneUser, getOneKeyword } from '../../api';

import MyNavbar from '../../Navbar/MyNavbar';
import Footer from '../../Footer/Footer';
import QuestionsStats from './QuestionsStats';

function StatsPage(props) {
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);
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
        if (props.case==='keyword') {
            getOneKeyword(props.id)
            .then(response => {
                setName(response.data.name);
                setErr(false);
            })
            .catch(err => {
                setErr(true);
            })
        }
    }, [props.id])

    return(
        <div className="all-page">
            <MyNavbar />
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
                {props.case==='keyword' &&
                    <div className="center-content margin-top-small flex-layout with-whitespace">
                        <a  href={`/keywords/${props.id}`}
                            style={{'fontSize': '1.5rem', 'marginTop': '-8px'}}>
                            {name}
                        </a>
                        <h4> Statistics</h4>
                    </div>
                }
                <div className="flex-layout">
                    {(props.case==='questions-gen'||props.case==='questions-user') &&
                        <QuestionsStats case={props.case} id={props.id}/>                
                    }
                    {props.case==='all-user' &&
                        <QuestionsStats case='questions-user' id={props.id}/>
                    }
                    {props.case==='all-user' &&
                        <QuestionsStats case='answers-user' id={props.id}/>
                    }
                    {props.case==='keyword' &&
                        <QuestionsStats case={props.case} id={props.id} name={name} />
                    }
                </div>
                { err &&
                    <div className="error-message margin-top">
                        Sorry, no data found.
                    </div>
                
                }

            <Footer />
        </div>
    )
}

export default StatsPage;