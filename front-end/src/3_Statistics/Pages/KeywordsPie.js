import React, { useState, useEffect } from "react";
import { getKeywordStats } from "../../api";
import Pie from '../Diagrams/Pie';

function KeywordsPie(props) {
    const [statsList, setStatsList] = useState([]);
    const [err, setErr] = useState(false);

    useEffect(() => {
        getKeywordStats()
        .then(response => {
            console.log(response.data);
            fixData(response.data);
        })
        .catch(err => {
            setErr(true);
        })
    }, [])

    const fixData = (res) => {
        let sum = 0;
        let stats = [];
        res.forEach(keyword => {
            sum += keyword.questions;
        })
        res.forEach(keyword => {
            stats.push({
                y: Math.round((keyword['questions']/sum)*100*100)/100,
                label: keyword['name'],
            })
        })
        setStatsList(stats);
    }

    return(
        <div className="main-page margin-top-small flex-item">
            {!err &&
                    <Pie data={statsList} title={`Keyword Questions`} />
            }
            { err &&
                <div className="error-message margin-top">
                    Sorry, no data found.
                </div>
            
            }
        </div>
    )
}

export default KeywordsPie;