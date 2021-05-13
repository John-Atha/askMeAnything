import React from 'react';

import './styles.css';
import score_icon from '../images/score.png'

function Basics(props) {
    return(
        <div>
            <div className="flex-layout">
                <h1 className='profile-username'>
                    {props.user.username}
                </h1>
                <div style={{'marginLeft': '10px'}} className="flex-layout">
                    <img style={{'height': '30px', 'marginTop': '10px'}} src={score_icon} />
                    <div style={{'marginTop': '10px', 'fontSize': '20px'}} >{props.user.points}</div>
                </div>
            </div>
            <h4 className="profile-bio">
                {props.user.bio}
            </h4>
            <div style={{'textAlign': 'left'}}>Member since: { props.user.member_since ? props.user.member_since.slice(0, 10) : '-'}</div>
            
        </div>
    )
}

export default Basics;