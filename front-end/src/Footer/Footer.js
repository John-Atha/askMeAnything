import {React} from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './Footer.css';

function Footer() {
    return(
        <Navbar variant="light" 
                bg="light"
                expand="md"
                fixed="bottom">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className="footer-link" style={{'width': '20vw'}} href="/about">About</Nav.Link>
                    <Nav.Link className="footer-link" style={{'width': '20vw'}} href="https://github.com/John-Atha" rel='noopener noreferrer' target='_blank'>Contact us</Nav.Link>
                    <Nav.Link className="footer-link" style={{'width': '20vw'}} href="#" rel='noopener noreferrer' target='_blank'>Project Documentation</Nav.Link>
                    <Nav.Link className="footer-link" style={{'width': '20vw'}} href="https://github.com/John-Atha/askMeAnything" rel='noopener noreferrer' target='_blank'>Github</Nav.Link>
                    <Nav.Link className="footer-link" style={{'width': '20vw'}} href="#" rel='noopener noreferrer' target='_blank'>Course materials</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default Footer;