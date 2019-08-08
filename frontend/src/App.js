import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header.js";
import addMachine from "./components/addMachine.js";
import addMantencion from "./components/addMantencion.js";
import addReparacion from "./components/addReparacion.js";
import viewMachines from "./components/viewMachines.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Home() {
  return <h1>Seleccione una Opción</h1>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Container>
          <Header />

          <Route exact path="/" component={Home} />
          <Route exact path="/maquinas/add" component={addMachine} />
          <Route path="/mantenciones/add" component={addMantencion} />
          <Route path="/reparaciones/add" component={addReparacion} />
          <Route exact path="/maquinas" component={viewMachines} />
        </Container>
      </div>
    </Router>
  );
}

export default App;
