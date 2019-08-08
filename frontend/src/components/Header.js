import React from "react";
import logo from "./logo.png"; // Tell Webpack this JS file uses this image

import { Navbar, Nav } from "react-bootstrap";

function Header() {
  console.log(logo); // /logo.84287d09.png

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">
        <img src={logo} height="80" alt="Fablab" />
      </Navbar.Brand>
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
