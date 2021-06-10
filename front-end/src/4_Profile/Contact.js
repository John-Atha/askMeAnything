import React, { useState, useEffect } from 'react';

import email_icon from '../images/email.png';
import git_icon from '../images/Octocat.png';
import web_icon from '../images/web.png';
import edit_icon from '../images/edit.png';
import save_icon from '../images/save.png';
import discard_icon from '../images/error.png';

import { updateUser, isLogged } from '../api';
import { createNotification } from '../createNotification';

import './styles.css';

function Contact(props) {
    const [userId, setUserId] = useState(null);

    const [email, setEmail] = useState(props.user.email);
    const [editEmail, setEditEmail] = useState(false);
    const [initEmail, setInitEmail] = useState(props.user.email);

    const [github, setGithub] = useState(props.user.github_username);
    const [editGithub, setEditGithub] = useState(false);
    const [initGithub, setInitGithub] = useState(props.user.github_username);

    const [website, setWebsite] = useState(props.user.site_url);
    const [editWebsite, setEditWebsite] = useState(false);
    const [initWebsite, setInitWebsite] = useState(props.user.site_url);

    useEffect(()=>{
        setEmail(props.user.email);
        setInitEmail(props.user.email);

        setGithub(props.user.github_username);
        setInitGithub(props.user.github_username);

        setWebsite(props.user.site_url);
        setInitWebsite(props.user.site_url);

    }, [props.user]);

    useEffect(() => {
        isLogged()
        .then(response => {
            console.log(response);
            setUserId(response.data.id);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const update = (key) => {
        let diff = false;
        let obj = {};
        switch (key) {
            case 'github':
                diff = github !== initGithub;
                if (diff) obj['github_username'] = github;
                break;
            case 'email':
                diff = email !== initEmail;
                if (diff) obj['email'] = email;
                break;
            case 'web':
                diff = website !== initWebsite;
                if (diff) obj['site_url'] = website;
                break;
        }
        if (!diff) return;
        updateUser(obj, props.user.id)
        .then(response => {
            let keyword = '';
            switch(key) {
                case 'github':
                    setGithub(response.data.github_username);
                    setInitGithub(response.data.github_username);
                    keyword = 'Github username';
                    break;
                case 'email':
                    setEmail(response.data.email);
                    setInitEmail(response.data.email);
                    keyword = 'Email';
                    break;
                case 'web':
                    setWebsite(response.data.site_url);
                    setInitWebsite(response.data.site_url);
                    keyword = 'Website';
                    break;
            }
            createNotification('success', 'Hello', `${keyword} updated successfully`);
        })
        .catch(err => {
            console.log(err);
            createNotification('danger', 'Sorry,', 'We could not update your info');
        })
        
    }


    return(
        <table className="contact-container">
            <tbody>
                <tr>
                    <td>
                        <img style={{'height': '30px', 'width': '35px'}} src={email_icon} />
                    </td>
                    <td>
                        <div className='contact-item' style={{'textAlign': 'left'}}>Email</div>
                    </td>
                    <td>
                        { editEmail &&
                            <input type='text' className='contact-item profile-input' style={{'textAlign': 'left'}} value={email} onChange={(event)=>{setEmail(event.target.value)}} />
                        }
                        { !editEmail &&
                            <div className='contact-item' style={{'textAlign': 'left'}}>{email}</div>
                        }
                    </td>
                    { userId === props.user.id &&
                        <td className='flex-layout' style={{'width': '80px'}}>
                            { !editEmail &&
                                <input type='image' onClick={()=>{setEditEmail(true)}} style={{ 'border': 'none', 'height': '15px', 'width': '20px', 'textAlign': 'left', 'marginLeft': '10px'}} 
                                src={ edit_icon } />
                            }
                            { editEmail &&
                                <input type='image' onClick={()=>{setEditEmail(false);update('email');}} style={{ 'border': 'none', 'height': '30px', 'width': '25px', 'textAlign': 'left', 'marginLeft': '10px'}} 
                                src={ save_icon } />                        
                            }
                            { editEmail &&
                                <input type='image' onClick={()=>{setEditEmail(false);setEmail(initEmail)}} style={{ 'border': 'none', 'height': '25px', 'width': '25px', 'textAlign': 'left', 'marginLeft': '10px', 'marginTop': '2px'}} 
                                src={ discard_icon } />
                            }
                        </td>            
                    }
                </tr>
                <tr>
                    <td>
                        <img style={{'height': '30px', 'width': '35px', 'textAlign': 'left'}} src={git_icon} />
                    </td>
                    <td>
                        <div className='contact-item' style={{'textAlign': 'left'}}>Github</div>                    
                    </td>
                    <td style={{'textAlign': 'left'}}>
                        { editGithub &&
                            <input type='text' className='contact-item profile-input' style={{'textAlign': 'left'}} value={github} onChange={(event)=>{setGithub(event.target.value)}} />
                        }
                        { !editGithub &&
                            <a className='contact-item'
                                rel = 'noopener noreferrer'
                                target='_blank'
                                href={github? `https://www.github.com/${props.user.github_username}` : '#'}>
                                    {github || '-'}
                            </a>
                        }
                    </td>
                    { userId === props.user.id &&
                        <td className='flex-layout'>
                            { !editGithub &&
                                <input type='image' onClick={()=>{setEditGithub(true)}} style={{ 'border': 'none', 'height': '15px', 'width': '20px', 'textAlign': 'left', 'marginLeft': '10px'}} 
                                src={ edit_icon } />
                            }
                            { editGithub &&
                                <input type='image' onClick={()=>{setEditGithub(false);update('github');}} style={{ 'border': 'none', 'height': '30px', 'width': '25px', 'textAlign': 'left', 'marginLeft': '10px'}} 
                                src={ save_icon } />                        
                            }
                            { editGithub &&
                                <input type='image' onClick={()=>{setEditGithub(false);setGithub(initGithub)}} style={{ 'border': 'none', 'height': '25px', 'width': '25px', 'textAlign': 'left', 'marginLeft': '10px', 'marginTop': '2px'}} 
                                src={ discard_icon } />
                            }
                        </td>
                    }
                </tr>
                <tr>
                    <td>
                        <img style={{'height': '25px', 'width': '35px'}} src={web_icon} />
                    </td>
                    <td>
                        <div className='contact-item' style={{'textAlign': 'left'}}>Website</div>
                    </td>
                    <td style={{'textAlign': 'left'}}>
                        { editWebsite &&
                            <input type='text' className='contact-item profile-input' style={{'textAlign': 'left'}} value={website} onChange={(event)=>{setWebsite(event.target.value)}} />
                        }
                        { !editWebsite &&
                            <a className='contact-item' style={{'textAlign': 'left'}}
                                rel = 'noopener noreferrer'
                                target='_blank'
                                href={website || '#'}>{website || '-'}
                            </a>                    
                        }
                    </td>
                    { userId === props.user.id &&
                        <td className='flex-layout'>
                            { !editWebsite &&
                                <input type='image' onClick={()=>{setEditWebsite(true)}} style={{ 'border': 'none', 'height': '15px', 'width': '20px', 'textAlign': 'left', 'marginLeft': '10px'}} 
                                src={ edit_icon } />
                            }
                            { editWebsite &&
                                <input type='image' onClick={()=>{setEditWebsite(false);update('web');}} style={{ 'border': 'none', 'height': '30px', 'width': '25px', 'textAlign': 'left', 'marginLeft': '10px'}} 
                                src={ save_icon } />                        
                            }
                            { editWebsite &&
                                    <input type='image' onClick={()=>{setEditWebsite(false);setWebsite(initWebsite)}} style={{ 'border': 'none', 'height': '25px', 'width': '25px', 'textAlign': 'left', 'marginLeft': '10px', 'marginTop': '2px'}} 
                                    src={ discard_icon } />
                            }
                        </td>
                    }
                </tr>
            </tbody>
        </table>
    )
}

export default Contact;
