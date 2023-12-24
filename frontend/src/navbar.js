import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const MyNavbar = () => {
  return (
    <Container>
    <Navbar bg="primary" data-bs-theme="dark" expand="xxl">
            <Container>
                <Navbar.Brand>
                    <img
                    alt=""
                    src="./logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                    HEMON
                </Navbar.Brand>
            </Container>
        </Navbar> 
    </Container>
  );
};

export default MyNavbar;
