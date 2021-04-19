import React from 'react';

import './styles.css'
import '../generalStyles.css'

import LoginBox from './LoginBox';
import RegisterBox from './RegisterBox';
import Title from '../Title';

function LoginRegister(props) {
    
    
    return(
        <div className="login-register-page center-content">
            <Title />
            {props.case==="login" &&
                <LoginBox />
            }
            {props.case==="register" &&
                <RegisterBox />
            }
        </div>
    )
}

export default LoginRegister;