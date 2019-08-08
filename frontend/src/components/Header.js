import React from "react";

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Fablab</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/maquinas/add">Añadir Máquinas</Nav.Link>
          <Nav.Link href="/maquinas/">Listar Máquinas</Nav.Link>
          <Nav.Link href="/mantenciones/add">Registrar Mantención</Nav.Link>
          <Nav.Link href="/reparaciones/add">Registrar Reparación</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
