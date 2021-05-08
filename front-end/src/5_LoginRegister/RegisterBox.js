import React, { useState } from 'react';
import { Register, Login } from '../api';
import './styles.css'
import '../generalStyles.css'
import Button from 'react-bootstrap/Button';

function RegisterBox() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");

    const handleUsername = (val) => {
        if (val.length<21) {
            setUsername(val);
            setError(null);
            setSuccess(null);
            if (val.length<4) setError("Username should be between 4 and 20 characters."); 
        }
        else {
            setError("Username should be between 4 and 20 characters.");
            setSuccess(null);
        }
    }
    const handleSubmit = (event) => {
        if (username.length<4) {
            setError('Username should be between 4 and 20 characters.');
            setSuccess(null);
        }
        else if (password.length<10 || confirmation.length<10) {
            setError("Password should be between 10 and 30 characters.");
            setSuccess(null);
        }
        else if (username.length && password.length) {
            console.log('submitted');
            if (password===confirmation) {
                Register(username, password, confirmation, email)
                .then(response=> {
                    Login(username, password)
                    .then(response => {
                        setSuccess("Registered successfully");
                        setError(null);
                        localStorage.setItem('token', response.data.access_token);
                        setTimeout(()=>{window.location.href="/";}, 300);
                    })
                    .catch(err => {
                        console.log(err);
                        setSuccess(null);
                        setError("Something went wrong, try logging in with the info you just inserted.");
                    })
                })
                .catch(err => {
                    console.log(err);
                    setSuccess(null);
                    setError("Sorry, username/email probably already exist.");
                })
            }
            else {
                setSuccess(null);
                setError("Passwords don't match");
            }
        }
        else {
            setError("Fill both fields");
            setSuccess(null);
        }
        event.preventDefault();
    }
    const good_warning = () => {
        setError(null);
        setSuccess(null);    
    }
    const bad_warning = () => {
        setError("Passwords don't match")
        setSuccess(null);    
    }
    const handlePass = (event) => {
        if (event.target.value.length<10) {
            setError("Password should be between 10 and 30 characters.")
            setSuccess(null); 
            if (event.target.name==="password") setPassword(event.target.value);
            else setConfirmation(event.target.value);       
        }
        else if (event.target.name==="password"){
            setPassword(event.target.value);
            if (event.target.value===confirmation) {
                good_warning();   
            }
            else {
                bad_warning();   
            }
        }
        else {
            setConfirmation(event.target.value);
            if (event.target.value===password) {
                good_warning();    
            }
            else {
                bad_warning();   
            }
        }
    }

    return(
        <div className="register-box margin-top-small center-content">
            <h5>Register</h5>
            <div className="error-message">{error}</div>
            <div className="success-message">{success}</div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Enter your username..." className="margin-top-smaller" value={username} typ="text" onChange={(event) => handleUsername(event.target.value)} />
                <div className="break"></div>
                <input placeholder="Email" className="margin-top-smaller" value={email} type="text" onChange={(event)=>{setEmail(event.target.value)}} />
                <div className="break"></div>
                <input placeholder="Enter your password..." className="margin-top-smaller" name="password" value={password} type="password" onChange={handlePass} />
                <div className="break"></div>
                <input placeholder="Re-type your password..." className="margin-top-smaller" value={confirmation} type="password" onChange={handlePass} />
                <div className="break"></div>
                <Button type="submit" className="margin" variant="outline-primary" onClick={handleSubmit}>Submit</Button>
                <Button className="margin" variant="outline-danger" onClick={(e)=>{setUsername("");setPassword("");setConfirmation("");setSuccess(null);setError(null);e.preventDefault();}}>Clear</Button>
            </form>
            <div className="margin-top-small">
                <div>Already have an account?</div>
                <a href="/login">Login</a>
            </div>

        </div>
    )
}

export default RegisterBox;