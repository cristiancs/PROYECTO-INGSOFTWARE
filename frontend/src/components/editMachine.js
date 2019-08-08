import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import handleChange from "../helpers/handleChange";
import objectToFormData from "object-to-formdata";

class editMachine extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      add: {
        nombre: "",
        tipo: ""
      }
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8080/maquinas/view/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          add: { ...response.data }
        });
      });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const esto = this;
    axios
      .post(
        "http://localhost:8080/maquinas/edit/" + this.props.match.params.id,
        objectToFormData(this.state.add)
      )
      .then(function(response) {
        alert("Máquina editada correctamente");
      })
      .catch(function(error) {
        alert(error);
      });
  }
  changeValue(e) {
    handleChange(e, this, "add");
  }
  render() {
    return (
      <React.Fragment>
        <h1>Añadir Máquina</h1>

        <form onSubmit={this.onSubmit}>
          <Row>
            <Col sm="6">
              <Form.Group controlId="nombre">
                <Form.Label>Nombre Máquina</Form.Label>
                <Form.Control
                  name="nombre"
                  onChange={this.changeValue}
                  required
                  value={this.state.add.nombre}
                />
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

          <Button type="submit">Editar</Button>
        </form>
      </React.Fragment>
    );
  }
}
export default editMachine;
