import React from 'react';

import email_icon from '../images/email.png';
import git_icon from '../images/Octocat.png';
import web_icon from '../images/web.png';
import './styles.css';

function Contact(props) {

    const github_url = props.user.github_username ? `https://www.github.com/${props.user.github_username}` : '#';
    const website_url = props.user.site_url || '#';

    return(
        <div className="contact-container">
            <img style={{'height': '30px', 'width': '35px', 'gridRow': 1, 'gridColumn': 1, 'marginTop': '-4px'}} src={email_icon} />
            <div className='contact-item' style={{'gridRow': 1, 'gridColumn': 2, 'textAlign': 'left'}}>Email</div>
            <div className='contact-item' style={{'gridRow': 1, 'gridColumn': 3, 'textAlign': 'left'}}>{props.user.email}</div>
            <img style={{'height': '30px', 'width': '35px', 'gridRow': 2, 'gridColumn': 1, 'marginTop': '-7px', 'textAlign': 'left'}} src={git_icon} />
            <div className='contact-item' style={{'gridRow': 2, 'gridColumn': 2, 'textAlign': 'left'}}>Github</div>
            <a   className='contact-item' style={{'gridRow': 2, 'gridColumn': 3, 'textAlign': 'left'}} href={github_url}>{props.user.github_username || '-'}</a>
            <img style={{'height': '25px', 'width': '35px', 'gridRow': 3, 'gridColumn': 1, 'marginTop': '0px'}} src={web_icon} />
            <div className='contact-item' style={{'gridRow': 3, 'gridColumn': 2, 'textAlign': 'left'}}>Website</div>
            <a   className='contact-item' style={{'gridRow': 3, 'gridColumn': 3, 'textAlign': 'left'}} href={website_url}>{props.user.site_url || '-'}</a>
        </div>
    )
}

export default Contact;
