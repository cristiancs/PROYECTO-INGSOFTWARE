import React from "react";

import "./App.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header.js";
import addMachine from "./components/addMachine.js";
import editMachine from "./components/editMachine.js";
import addMantencion from "./components/addMantencion.js";
import addReparacion from "./components/addReparacion.js";
import viewMachines from "./components/viewMachines.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function Home() {
  return <h1>Seleccione una Opción</h1>;
}

function Error404() {
  return <h1>Error 404 - No Encontrado</h1>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Container>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/maquinas/edit/:id" component={editMachine} />
            <Route exact path="/maquinas/add" component={addMachine} />
            <Route path="/mantenciones/add" component={addMantencion} />
            <Route path="/reparaciones/add" component={addReparacion} />
            <Route exact path="/maquinas" component={viewMachines} />
            <Route component={Error404} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
