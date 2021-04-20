import {React} from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './Footer.css';

function Footer() {
    return(
        <Navbar variant="light" 
                bg="light"
                expand="md"
                fixed="bottom" >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className="footer-link" style={{'width': '20vw'}}href="#">About</Nav.Link>
                    <Nav.Link className="footer-link" style={{'width': '20vw'}}href="#">Contact us</Nav.Link>
                    <Nav.Link className="footer-link" style={{'width': '20vw'}}href="#">Project Documentation</Nav.Link>
                    <Nav.Link className="footer-link" style={{'width': '20vw'}}href="#">Github</Nav.Link>
                    <Nav.Link className="footer-link" style={{'width': '20vw'}}href="#">Course materials</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default Footer;