import React, { useState } from "react";

import './styles.css'
import '../generalStyles.css'
import Button from 'react-bootstrap/Button';

function RegisterBox() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleUsername = (val) => {
        if (val.length<16) {
            setUsername(val);
            setError(null);
            setSuccess(null);
        }
        else {
            setError("Username should be less than 15 characters");
            setSuccess(null);
        }
    }
    const handleSubmit = (event) => {
        if (username.length && password.length) {
            console.log('submitted');
            if (password===confirmation) {
                setSuccess("Registered successfully");
                setError(null);
                window.location.href="/";
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
        if (event.target.name==="password"){
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