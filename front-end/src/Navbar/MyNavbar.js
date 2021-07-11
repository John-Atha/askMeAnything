import React, { useState, useEffect } from 'react';

import { isLogged } from '../api';
import { createNotification } from '../createNotification';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './MyNavbar.css';
import '../generalStyles.css';

function MyNavbar() {

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        isLogged()
        .then(response => {
            //console.log(response);
            setUserId(response.data.id);
        })
        .catch(err => {
            ;
        })
    })

    const redirect = (dst) => {
        if (userId) {
            window.location.href=`/${dst}`;
        }
        else {
            createNotification('danger', 'Sorry,', 'You cannot have access to this page without an account.');
        }
    }

    const logout = () => {
        localStorage.setItem('token', null);
        window.location.href = '/login';
    }

    return(
        <Navbar variant="light" expand="md" fixed='top'>
            <Navbar.Brand href="/">AskMeAnything</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link onClick={()=>redirect('my')}>My AskMeAnything</Nav.Link>
                    <Nav.Link onClick={()=>redirect(`users/${userId}`)}>My Profile</Nav.Link>
                    <Nav.Link onClick={()=>redirect('ask')}>Ask a question</Nav.Link>
                    <Nav.Link onClick={()=>redirect('keywords')}>Keywords</Nav.Link>
                </Nav>
                {!userId &&
                    <Nav>
                        <Nav.Link onClick={()=>window.location.href='/login'}>Login</Nav.Link>
                        <Nav.Link onClick={()=>window.location.href='/register'}>Register</Nav.Link>
                    </Nav>
                }
                {userId &&
                    <Nav>
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MyNavbar;