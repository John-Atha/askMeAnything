import React, { useEffect, useState } from 'react';

import { getUsersRanking } from '../api';

import Button from 'react-bootstrap/Button';
import './styles.css';

function RankingMain() {
    const [rankList, setRankList] = useState([]);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(10);
    const [noData, setNoData] = useState(false);
    const [position, setPosition] = useState(null);

    useEffect(() => {
        getUsersRanking(start, end)
        .then(response => {
            console.log(response);
            setRankList(rankList.concat(response.data.ranking));
            setPosition(response.data.position);
            setNoData(!response.data.ranking.length)
        })
        .catch(err => {
            console.log(err);
            setNoData(true);
        })
    }, [start, end])    

    return(
        <div className="center-content">
        {position &&
            <h4 className='margin-top-small with-whitespace'>Your position: {position} {position<=10 && '\nGood job!'}</h4>
        }
        <table className="margin-top-small rank-table center-content">
            <thead>
                <tr>
                    <td style={{'width':'100px'}}>Position</td>
                    <td style={{'width':'200px'}}>User</td>
                    <td style={{'width':'100px'}}>Points</td>
                </tr>
            </thead>
            <tbody>
            {rankList.map((value, index) => {
                return(
                    <tr key={index+0.1} style={{ 'backgroundColor': (index%2===0) ? 'white' : 'lightgrey' }} >
                        <td key={index+0.2} style={{'width':'100px'}}>{index+1}</td>
                        <td key={index+0.3} style={{'width':'200px', 'textAlign': 'center'}}><a href={`/users/${value.id}`}>{value.username}</a></td>
                        <td key={index+0.4} style={{'width':'100px'}}>{value.points}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        {!noData && 
            <Button variant="outline-primary" className="margin-top"
                    onClick={()=>{setStart(start+10);setEnd(end+10)}}>
                        See more
            </Button>
        }
        {noData && 
            <div className="margin-top-smaller error-message">Sorry, no more users found.</div>
        }
        </div>

    )
}

export default RankingMain;