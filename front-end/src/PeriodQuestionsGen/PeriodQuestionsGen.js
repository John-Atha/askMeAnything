import {React, useState, useEffect} from 'react';

import { isLogged, getKeywordsStats, getUserQuestionsStats, getUserAnsweredStats, getGeneralQuestionStats } from '../api';

import OnePeriodQuestionsGen from './OnePeriodQuestionsGen';

function PeriodQuestionsGen(props) {

    const [id, setId] = useState(props.id)
    const [noData, setNoData] = useState(false);
    const [userId, setUserId] = useState(null);
    const [statsList, setStatsList] = useState([]);

    const checkLogged = () => {
        isLogged()
        .then(response => {
            //console.log(response);
            setUserId(response.data.id);
        })
        .catch(err => {
            console.log(err);
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

    const getGeneral = () => {
        let func = getGeneralQuestionStats;
        switch(props.case) {
            case 'user':
                func = getUserQuestionsStats;
                break;
            case 'keyword':
                func = getKeywordsStats;
                break;
            case 'user-answered':
                func = getUserAnsweredStats;
                break;
        } 
        func(props.id)
        .then(response => {
            setStatsList([]);
            setStatsList(response.data);
            setNoData(!response.data.length);
        })
        .catch(err => {
            setNoData(true);
        })
    }

    useEffect(() => {
        checkLogged();
        if (props.case!=='keyword') {
            getGeneral();
        }
    }, [])

    useEffect(() => {
        if (props.case==='keyword') {
            setId(props.id);
            getGeneral();
        }
    }, [props.id])
    
    return(
        <div className="margin-top-small main-page" style={{'paddingBottom': '100px'}}>
            {props.case==='keyword' &&
                <h4>{props.name}</h4>
            }
            {props.case==='user' &&
                <div className="flex-layout with-whitespace">
                    <h4>All questions of </h4>
                    <a  href={`/users/${props.id}`}
                        style={{'fontSize': '1.5rem', 'marginTop': '-4px'}}>
                            {props.username}
                    </a>
                </div>    
            }
            {props.case==='user-answered' &&
                <div className="flex-layout with-whitespace">
                    <h4>All questions </h4>
                    <a  href={`/users/${props.id}`}
                        style={{'fontSize': '1.5rem', 'marginTop': '-4px'}}>
                            {props.username}
                    </a>
                    <h4> has answered</h4>
                </div>    
            }
            {props.case==='general' &&
                <h4>All questions</h4>
            }
            {statsList.map((value, index) => {
                const { year, month } = extractYearMonth(value.month);
                return(
                    <OnePeriodQuestionsGen 
                        key={index}
                        month={month}
                        monthNum={value.month.slice(5, 7)}
                        year={year}
                        userId={userId}
                        id={id}
                        case={props.case}
                        count={(props.case==='user'||props.case==='general'||props.case==='keyword') ? value.questions : value.answered}
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

export default PeriodQuestionsGen;