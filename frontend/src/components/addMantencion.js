import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import handleChange from "../helpers/handleChange";
import objectToFormData from "object-to-formdata";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
class addMantencion extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.state = {
      add: {
        id_maquina: "",
        id_usuario: "",
        comentarios: "",
        fecha: ""
      },
      maquinas: []
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8080/maquinas/").then(response => {
      this.setState({
        maquinas: response.data,
        add: { ...this.state.add, id_maquina: response.data[0].id }
      });
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
        alert("Mantención Registrada correctamente");
        esto.setState({
          add: {
            id_maquina: this.state.maquinas[0].id,
            id_usuario: "",
            comentarios: "",
            fecha: ""
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
  changeDate(date, variable) {
    console.log(date, variable);
    this.setState({
      add: {
        ...this.state.add,
        [variable]: moment(date).format("DD-MM-YYYY HH:mm:ss")
      }
    });
  }
  render() {
    const opciones = [];
    this.state.maquinas.forEach(element => {
      opciones.push(
        <option key={element.id} value={element.id}>
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
                  name="id_maquina"
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
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  name="id_usuario"
                  onChange={this.changeValue}
                  required
                  value={this.state.add.id_usuario}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="fecha">
                <Form.Label>Fecha</Form.Label>
                <br />
                <DatePicker
                  id="fecha"
                  name="fecha"
                  required
                  className="form-control"
                  value={this.state.add.fecha}
                  showTimeSelect
                  dateFormat="DD-MM-YYYY HH:mm:ss"
                  onChange={date => this.changeDate(date, "fecha")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="comentarios">
            <Form.Label>Comentarios</Form.Label>
            <Form.Control
              as="textarea"
              onChange={this.changeValue}
              value={this.state.add.comentarios}
              name="comentarios"
              required
              rows="10"
            />
          </Form.Group>

          <Button type="submit">Registrar</Button>
        </form>
      </React.Fragment>
    );
  }
}
export default addMantencion;
