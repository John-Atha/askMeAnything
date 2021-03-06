import React, { useState, useEffect } from 'react';

import { getGeneralQuestionsStatsDaily,
         getUserQuestionsStatsDaily,
         getUserAnswersStatsDaily,
         getKeywordsStatsDaily } from '../../api';

import Pie from '../Diagrams/Pie';

function DailyStats(props) {
    const [statsList, setStatsList] = useState([]);
    const [err, setErr] = useState(false);
    const key = (props.case === 'answers-user') ? 'answers' : 'questions';
    const [title, setTitle] = useState(
        props.case==='answers-user' ? `${props.username ? props.username+"'s" : 'Your'} daily answers` : 
        (props.case==='questions-user' ? `${props.username ? props.username+"'s" : 'Your'} daily questions` : 'Daily questions')
    )

    useEffect(() => {
        setTitle(
            props.case==='answers-user' ? `${props.username ? props.username+"'s" : 'Your'} daily answers` : 
            (props.case==='questions-user' ? `${props.username ? props.username+"'s" : 'Your'} daily questions` : 'Daily questions')
        );
    }, [props.case, props.username]);

    const fixData = (res) => {
        let sum = 0;
        res.forEach((day) => {
            sum+=parseInt(day[key]);
        });
        let stats = [];
        res.forEach((day) => {
            //console.log(day);
            stats.push({
                y: Math.round((day[key]/sum)*100*100)/100,
                label: day.day,
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
        let func = getGeneralQuestionsStatsDaily;
        switch (props.case) {
            case 'questions-user':
                func = getUserQuestionsStatsDaily;
                break;
            case 'answers-user':
                func = getUserAnswersStatsDaily;
                break;
            case 'keyword':
                func = getKeywordsStatsDaily;
                break;
            default:
                break;
        }
        //if (props.id!==undefined) {
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
        //}
        //else {
        //    setErr(true);
        //}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id, props.case])

    return(
        <div className="main-page margin-top-small flex-item">
            {!err &&
                    <Pie data={statsList} 
                    title={title} 
              />
            }
            { err &&
                <div className="error-message margin-top">
                    Sorry, not enough data found for {title}.
                </div>
            
            }
        </div>
    )
}

export default DailyStats;