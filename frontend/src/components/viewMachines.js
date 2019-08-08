import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

class viewMachines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maquinas: []
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8080/maquinas/").then(response => {
      this.setState({
        maquinas: response.data
      });
    });
  }
  render() {
    const opciones = [];
    this.state.maquinas.forEach(element => {
      opciones.push(
        <tr>
          <td>{element.id}</td>
          <td>{element.nombre}</td>
          <td>{element.tipo}</td>
          <td>
            <Link to={`/maquinas/edit/${element.id}`}>
              <Button>Editar</Button>
            </Link>
          </td>
        </tr>
      );
    });

    return (
      <React.Fragment>
        <h1>Añadir Máquina</h1>
        <Table>
          <thead>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
          </thead>
          <tbody>{opciones}</tbody>
        </Table>
      </React.Fragment>
    );
  }
}
export default viewMachines;
