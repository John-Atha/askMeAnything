import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './MyNavbar.css';
import '../generalStyles.css';

function MyNavbar() {
    return(
        <Navbar variant="light" expand="md">
            <Navbar.Brand href="#home">AskMeAnything</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/my">My AskMeAnything</Nav.Link>
                    <Nav.Link href="#">My Profile</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/login">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MyNavbar;