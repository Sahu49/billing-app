import React, { useState } from 'react';
import "./core-styles/NavComponentStyle.css"
import { Navbar, Container, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { isAuthenticated, logoutHelper } from '../auth/authHelper';
import { Redirect } from "react-router-dom"


function NavComponent() {
    const [redirect, setRedirect] = useState(false)
    const logoutHandler = () => {
        logoutHelper();
        setRedirect(true)
    }
    const redirectHelper = () => {
        return <Redirect to="/signup" />
    }
    return (

        <Navbar bg="info" expand="lg" style={{ position: "sticky", top: "0px", zIndex: "1", "color": "white" }}>
            <Container>
                <Navbar.Brand><Link to="/" style={{ textDecoration: "none", color: "black" }}>helpbiz</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {isAuthenticated() && <Nav.Link> <Link className="nav-link" to="/"> Home</Link></Nav.Link>}
                        {isAuthenticated() && <Nav.Link> <Link className="nav-link" to="/"> dashboard</Link></Nav.Link>}
                        {isAuthenticated() && <Nav.Link> <Link className="nav-link" to="/user/account">My Account</Link></Nav.Link>}
                        {!isAuthenticated() && <Nav.Link> <Link className="nav-link" to="/signup"> Signup</Link></Nav.Link>}
                        {!isAuthenticated() && <Nav.Link> <Link className="nav-link" to="/signin"> Signin</Link></Nav.Link>}
                        {isAuthenticated() && <Nav.Link> <span className="nav-link" onClick={() => { logoutHandler() }}> logout</span></Nav.Link>}
                        {redirect && redirectHelper()}

                        <Nav.Link> <Link className="nav-link" to="/customer/invoice/search"> Find Your Invoices</Link></Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
export default NavComponent
