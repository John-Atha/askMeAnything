import React, { useState, useEffect } from 'react';

import { getGeneralQuestionsStatsDaily, getUserQuestionsStatsDaily, getUserAnswersStatsDaily } from '../../api';

import Pie from '../Diagrams/Pie';

function QuestionsStats(props) {
    const [statsList, setStatsList] = useState([]);
    const [err, setErr] = useState(false);
    const key = props.case === 'answers-user' ? 'answers' : 'questions';

    const fixData = (res) => {
        let sum = 0;
        res.forEach((day) => {
            sum+=parseInt(day[key]);
        });
        let stats = [];
        res.forEach((day) => {
            console.log(day);
            stats.push({
                y: Math.round((day[key]/sum)*100*100)/100,
                label: day.day,
            })
        });
        setStatsList(stats);
    }
    
    useEffect(() => {
        let func = getGeneralQuestionsStatsDaily;
        switch (props.case) {
            case 'questions-user':
                func = getUserQuestionsStatsDaily;
                break;
            case 'answers-user':
                func = getUserAnswersStatsDaily;
                break;
        }
        func(props.id)
        .then(response => {
            console.log(response);
            //setStatsList(response.data);
            fixData(response.data);
            setErr(!response.data.length);
            
        })
        .catch(err => {
            console.log(err);
            setErr(true);
        })
    }, [])

    return(
        <div className="main-page margin-top-small flex-item">
            {!err &&
                    <Pie data={statsList} extraTitle={key} />
            }
            { err &&
                <div className="error-message margin-top">
                    Sorry, no data found.
                </div>
            
            }
        </div>
    )
}

export default QuestionsStats;