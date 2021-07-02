import React, { useState, useEffect } from 'react';

import './styles.css';
import score_icon from '../images/score.png'
import Button from 'react-bootstrap/Button';

import { isLogged, updateUser } from '../api';
import { createNotification } from '../createNotification';

function Basics(props) {
    const [userId, setUserId] = useState(null);

    const [username, setUsername] = useState(props.user.username);
    const [isEdittingUsername, setIsEdittingUsername] = useState(false);
    const [initUsername, setInitUsername] = useState(props.user.username);
    
    const [bio, setBio] = useState(props.user.bio);
    const [isEdittingBio, setIsEdittingBio] = useState(false);
    const [initBio, setInitBio] = useState(props.user.bio);

    useEffect(() => {
        setUsername(props.user.username);
        setInitUsername(props.user.username);
        setBio(props.user.bio);
        setInitBio(props.user.bio);
    }, [props.user])

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
        switch(key) {
            case 'username':
                diff = username !== initUsername;
                if (diff) obj['username'] = username;
                break;
            case 'bio':
                diff = bio !== initBio;
                if (diff) obj['bio'] = bio;
                break;
            default:
                break;
        }
        if (Object.keys(obj).length) {
            updateUser(obj, props.user.id)
            .then(response => {
                if (key==='username') {
                    setUsername(response.data.username);
                    setInitUsername(response.data.username);
                }
                else if (key==='bio') {
                    setBio(response.data.bio);
                    setInitBio(response.data.bio);
                }
                createNotification('success', 'Hello', `${key.charAt(0).toUpperCase()+key.slice(1)} updated successfully`);
            })
            .catch(err => {
                console.log(err);
                if (key==='username') {
                    createNotification('danger', 'Sorry', 'Username probably already exists.');
                    setUsername(initUsername);
                }
                else {
                    createNotification('danger', 'Sorry', 'We could not update your info.');
                    setBio(initBio);
                }
            })    
        }
    }

    return(
        <div>
            <div className="flex-layout">
                {!isEdittingUsername &&
                    <h1 className='profile-username'>
                        {username}
                    </h1>
                }
                { isEdittingUsername &&
                    <input type='text' className='profile-input' style={{'width': '100px', 'fontSize': 'xx-large'}} value={username} onChange={(event) => {setUsername(event.target.value)}} />
                }
                { !isEdittingUsername && userId === props.user.id && 
                    <Button variant='outline-primary'
                            onClick={()=>{setIsEdittingUsername(true)}}
                            style={{'height': '50%', 'marginTop': '10px', 'marginLeft': '5px', 'padding': '2px 5px'}}>
                        Edit
                    </Button>
                }
                { isEdittingUsername &&
                    <div className='flex-layout'>
                        <Button variant='success'
                            onClick={()=>{setIsEdittingUsername(false);update('username');}}
                            style={{'height': '80%', 'marginTop': '3%', 'marginLeft': '5px', 'padding': '2px 5px'}}>
                            Save
                        </Button>
                        <Button variant='danger'
                            onClick={()=>{setIsEdittingUsername(false);setUsername(initUsername)}}
                            style={{'height': '80%', 'marginTop': '3%', 'marginLeft': '5px', 'padding': '2px 5px'}}>
                            Discard
                        </Button>
                    </div>
                }
                <div style={{'marginLeft': '10px'}} className="flex-layout">
                    <img style={{'height': '30px', 'marginTop': '10px'}} src={score_icon} alt='score' />
                    <div style={{'marginTop': '10px', 'fontSize': '20px'}} >{props.user.points}</div>
                </div>
            </div>
            <div style={{'textAlign': 'left'}}>Member since: { props.user.member_since ? props.user.member_since.slice(0, 10) : '-'}</div>
            <div className='flex-layout margin-top-smaller'>
                { !isEdittingBio && bio &&
                    <h4 className="profile-bio with-whitespace" style={{'textAlign': 'left'}}>
                        {bio}
                    </h4>           
                }
                { !isEdittingBio && !bio &&
                    <i style={{'fontSize': 'larger'}}>No bio...</i>
                }
                { !isEdittingBio && userId === props.user.id &&
                        <Button variant='outline-primary'
                                onClick={()=>{setIsEdittingBio(true)}}
                                style={{'height': '50%', 'marginTop': '0px', 'marginLeft': '5px', 'padding': '2px 5px'}}>
                            Edit
                        </Button>
                }
                { isEdittingBio &&
                    <textarea value={bio} onChange={(event)=>{setBio(event.target.value)}} style={{'minWidth': '300px', 'minHeight': '200px', 'fontSize': 'larger'}} />
                }
            </div>
            { isEdittingBio &&
                <div className='flex-layout'>
                    <Button variant='success'
                            className='margin'
                            onClick={()=>{setIsEdittingBio(false);update('bio');}}>
                        Save
                    </Button>
                    <Button variant='danger'
                            className='margin'
                            onClick={()=>{setIsEdittingBio(false);setBio(initBio)}}>
                        Discard
                    </Button>
                </div>
            }            
        </div>
    )
}

export default Basics;