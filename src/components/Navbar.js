import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap';
import UserImage from '../images/user.png';
import Logo from '../images/netflix.svg';
export default function NavBar() {
    return (
        <Navbar>
  <Container>
    <Navbar.Brand>
        <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Netflix logo"
        />
    </Navbar.Brand>
    <Nav>
    <Navbar.Brand>
        <img
            src={UserImage}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="User Profile"
        />
    </Navbar.Brand>
    </Nav>    
      
  </Container>
</Navbar>
    )
}
