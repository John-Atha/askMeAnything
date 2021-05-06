import React, { useState, useEffect } from 'react';

import { isLogged, getUserQuestionsStats } from '../api';

import UserOnePeriodQuestions from './UserOnePeriodQuestions';

function UserQuestions(props) {
    const [userId, setUserId] = useState(null);
    const [statsList, setStatsList] = useState([]);
    const [noData, setNoData] = useState(false);

    const checkLogged = () => {
        isLogged()
        .then(response => {
            console.log(response);
            setUserId(response.data.id);
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    const getGeneral = () => {
        getUserQuestionsStats(props.id)
        .then(response => {
            console.log(response);
            setStatsList(response.data);
            setNoData(!response.data.length);
        })
        .catch(err => {
            setNoData(true);
        })
    }


    const extractYearMonth = (str) => {
        const year = str.slice(0, 4);
        const monthNum = str.slice(5, 7);
        let month = ''
        switch(monthNum) {
            case '01':
                month = 'January';
                break;
            case '02':
                month = 'February';
                break;
            case '03':
                month = 'March';
                break;
            case '04':
                month = 'April';
                break;
            case '05':
                month = 'May'
                break;
            case '06':
                month = 'June';
                break;
            case '07':
                month = 'July';
                break;
            case '08':
                month = 'August';
                break;
            case '09':
                month = 'September';
                break;
            case '10':
                month = 'October';
                break;
            case '11':
                month = 'November';
                break;
            case '12':
                month = 'December';
                break;
        }
        return { year, month };
    }
    
    useEffect(() => {
        checkLogged();
        getGeneral();
    }, [])

    return(
        <div className="margin-top-small main-page" style={{'paddingBottom': '100px'}}>
            <div className="flex-layout with-whitespace">
                <h4>All questions of </h4>
                <a  href={`/users/${props.id}`}
                    style={{'fontSize': '1.5rem', 'marginTop': '-4px'}}
                >{props.username}</a>
            </div>
            {statsList.map((value, index) => {
                const { year, month } = extractYearMonth(value.month);
                return(
                    <UserOnePeriodQuestions 
                                key={index}
                                month={month}
                                monthNum={value.month.slice(5, 7)}
                                year={year}
                                userId={userId}
                                id={props.id}
                    />
                )
            })}
            {noData &&
                <div className="margin-top-smaller error-message">
                    Sorry, no questions found.
                </div>
            }
        </div>
    )
}

export default UserQuestions;