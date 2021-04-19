import React, { useState } from "react";

import './styles.css'
import '../generalStyles.css'
import Button from 'react-bootstrap/Button';

function LoginBox() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (val) => {
        if (val.length<16) {
            setUsername(val);
        }
    }

    return(
        <div className="login-box margin-top-small center-content">
            <h5>Login</h5>
            <div className="margin-top-small">
                <input placeholder="Enter your username..." value={username} typ="text" onChange={(event) => handleUsername(event.target.value)} />
            </div>
            <div className="margin-top-smaller">
                <input placeholder="Enter your password..." value={password} type="password" onChange={(event) => setPassword(event.target.value)} />
            </div>
            <Button className="margin-top-smaller" variant="outline-dark">Log in</Button>
        </div>
    )
}

export default LoginBox;