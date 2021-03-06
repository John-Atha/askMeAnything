import React, { useState } from 'react';
import { Login } from '../api'; 
import './styles.css'
import '../generalStyles.css'
import Button from 'react-bootstrap/Button';

function LoginBox() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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
            Login(username, password)
            .then(response => {
                setError(null);
                localStorage.setItem('token', response.data.access_token);
                setSuccess('Logged in successfully');
                setTimeout(()=>{window.location.href='/';}, 300);
            })
            .catch(err => {
                console.log(err);
                setSuccess(null);
                setError("Sorry, wrong credentials")
            })

        }
        else {
            setError("Fill both fields");
            setSuccess(null);
        }
        event.preventDefault();
    }

    return(
        <div className="login-box margin-top-small center-content">
            <h5>Login</h5>
            <div className="error-message">{error}</div>
            <div className="success-message">{success}</div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Enter your username..." className="margin-top-smaller" value={username} typ="text" onChange={(event) => handleUsername(event.target.value)} />
                <div className="break"></div>
                <input placeholder="Enter your password..." className="margin-top-smaller" value={password} type="password" onChange={(event) => {setPassword(event.target.value); setError(null); setSuccess(null);}} />
                <div className="break"></div>
                <Button type="submit" className="margin-top-small" variant="outline-primary" onClick={handleSubmit}>Submit</Button>
            </form>
            <div className="register-message margin-top-small">
                <div>First time here?</div>
                <a href="/register">Create an account</a>
                <div className='break'/>
                <div>or</div>
                <div className='break'/>
                <a href='/'>Continue without an account</a>
            </div>
        </div>
    )
}

export default LoginBox;