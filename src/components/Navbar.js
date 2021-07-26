import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap';
import UserImage from '../images/user.png';
import Logo from '../images/netflix.svg';
import {Link} from 'react-router-dom';

export default function NavBar() {
    return (
        <Navbar>
  <Container>
    <Navbar.Brand>
        <Link to="/">
        <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Netflix logo"
        />
        </Link>
    </Navbar.Brand>
    <Nav>
    <Navbar.Brand>
        <Link to="/profile">
        <img
            src={UserImage}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="User Profile"
        />
        </Link>
        
    </Navbar.Brand>
    </Nav>    
      
  </Container>
</Navbar>
    )
}
