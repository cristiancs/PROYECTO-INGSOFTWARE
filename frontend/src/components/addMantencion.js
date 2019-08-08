import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import handleChange from "../helpers/handleChange";
import objectToFormData from "object-to-formdata";

class addMachine extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      add: {
        id_maquina: "",
        id_usuario: "",
        comentarios: "",
        fecha_fin: "",
        fecha_inicio: "",
        estado: ""
      },
      maquinas: []
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8080/maquinas/").then(response => {
      this.setState({ maquinas: response.data });
    });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const esto = this;
    axios
      .post(
        "http://localhost:8080/mantenciones/add",
        objectToFormData(this.state.add)
      )
      .then(function(response) {
        alert("Máquina agregada correctamente");
        esto.setState({
          add: {
            nombre: "",
            tipo: ""
          }
        });
      })
      .catch(function(error) {
        alert(error);
      });
  }
  changeValue(e) {
    handleChange(e, this, "add");
  }
  render() {
    const opciones = [];
    this.state.maquinas.forEach(element => {
      opciones.push(
        <option value={element.id}>
          {element.nombre} ({element.tipo})
        </option>
      );
    });
    return (
      <React.Fragment>
        <h1>Añadir Mantención</h1>

        <form onSubmit={this.onSubmit}>
          <Row>
            <Col sm="6">
              <Form.Group controlId="nombre">
                <Form.Label>Máquina</Form.Label>
                <Form.Control
                  as="select"
                  name="maquina"
                  onChange={this.changeValue}
                  required
                  value={this.state.add.maquina}
                >
                  {opciones}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group controlId="email">
                <Form.Label>Tipo Máquina</Form.Label>
                <Form.Control
                  name="tipo"
                  onChange={this.changeValue}
                  required
                  value={this.state.add.tipo}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit">Registrar</Button>
        </form>
      </React.Fragment>
    );
  }
}
export default addMachine;
