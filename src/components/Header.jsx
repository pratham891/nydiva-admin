import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file

const Header = () => (
  <Navbar bg="dark" expand="lg" className="border-bottom" style={{ backgroundColor: '#191c24' }}>
    <Navbar.Brand href="/" className="fw-bold text-light">Admin Dashboard</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/" className="text-light fw-semibold">Home</Nav.Link>
        <Nav.Link as={Link} to="/manage-products" className="text-light fw-semibold">Manage Products</Nav.Link>
        <Nav.Link as={Link} to="/orders" className="text-light fw-semibold">Orders</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;