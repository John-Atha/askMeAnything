import React, { useState, useEffect } from 'react';

import { getGeneralQuestionsStatsMonthly,
         getUserQuestionsStatsMonthly,
         getUserAnswersStatsMonthly,
         getKeywordsStatsMonthly } from '../../api';

import Line from '../Diagrams/Line';

function MonthlyStats(props) {
    const [statsList, setStatsList] = useState([]);
    const [err, setErr] = useState(false);
    const key = (props.case === 'answers-user') ? 'answers' : 'questions';

    const fixData = (res) => {
        const stats = [];
        res.forEach((obj) => {
            //console.log(obj);
            const date = obj['month'].split('-');
            stats.push({
                x: new Date(date[0], date[1], 1),
                y: obj[key],
            })
        });
        setStatsList(stats);
    }
    
    const checkEmpty = (data) => {
        let isEmpty = true;
        for (let i=0; i<data.length; i++) {
            if (data[i][key]!==0) {
                isEmpty = false;
                break;
            }
        }
        setErr(isEmpty);
    }

    useEffect(() => {
        let func = getGeneralQuestionsStatsMonthly;
        switch (props.case) {
            case 'questions-user':
                func = getUserQuestionsStatsMonthly;
                break;
            case 'answers-user':
                func = getUserAnswersStatsMonthly;
                break;
            case 'keyword':
                func = getKeywordsStatsMonthly;
                break;
        }
        if (props.id!==undefined) {
            console.log(`user_id: ${props.id}`);
            func(props.id)
            .then(response => {
                //console.log(response);
                fixData(response.data);
                checkEmpty(response.data);
            })
            .catch(err => {
                //console.log(err);
                setErr(true);
            })
        }
        else {
            setErr(true);
        }
    }, [props.id])

    return(
        <div className="main-page margin-top-small flex-item">
            {!err &&
                    <Line data={statsList} extraTitle={key} />
            }
            { err &&
                <div className="error-message margin-top">
                    Sorry, no data found.
                </div>
            
            }
        </div>
    )
}

export default MonthlyStats;