import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Import the CSS file

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-token-expiration');
    navigate('/admin-login');
  };

  return (
    <Navbar bg="dark" expand="lg" className="border-bottom" style={{ backgroundColor: '#191c24' }}>
      <Navbar.Brand href="/" className="fw-bold text-light">Admin Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className="text-light fw-semibold">Home</Nav.Link>
          <Nav.Link as={Link} to="/manage-products" className="text-light fw-semibold">Manage Products</Nav.Link>
          <Nav.Link as={Link} to="/orders" className="text-light fw-semibold">Orders</Nav.Link>
        </Nav>
        <Button variant="outline-light" onClick={handleLogout} className="ms-auto">
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;