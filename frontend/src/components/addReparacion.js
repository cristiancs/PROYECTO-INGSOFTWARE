import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import handleChange from "../helpers/handleChange";
import objectToFormData from "object-to-formdata";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
class addReparacion extends Component {
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
        fecha_fin: "",
        fecha_inicio: "",
        estado: 0
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
        "http://localhost:8080/reparaciones/add",
        objectToFormData(this.state.add)
      )
      .then(function(response) {
        alert("Reparación Registrada correctamente");
        esto.setState({
          add: {
            id_maquina: this.state.maquinas[0].id,
            id_usuario: "",
            comentarios: "",
            fecha_fin: "",
            fecha_inicio: "",
            estado: 0
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
        <h1>Añadir Reparación</h1>

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
            <div className="col">
              <Form.Group controlId="estado">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  as="select"
                  name="estado"
                  onChange={this.changeValue}
                  required
                  value={this.state.add.estado}
                >
                  <option value="0">Programada</option>
                  <option value="1">En Reparación</option>
                  <option value="2">Reparado</option>
                </Form.Control>
              </Form.Group>
            </div>
            <Col>
              <Form.Group controlId="fecha_inicio">
                <Form.Label>Fecha Inicio</Form.Label>
                <br />
                <DatePicker
                  id="fecha_inicio"
                  name="fecha_inicio"
                  required
                  className="form-control"
                  value={this.state.add.fecha_inicio}
                  showTimeSelect
                  dateFormat="DD-MM-YYYY HH:mm:ss"
                  onChange={date => this.changeDate(date, "fecha_inicio")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="fecha_fin">
                <Form.Label>Fecha Fin</Form.Label>
                <br />
                <DatePicker
                  id="fecha_fin"
                  name="fecha_fin"
                  required
                  className="form-control"
                  value={this.state.add.fecha_fin}
                  showTimeSelect
                  dateFormat="DD-MM-YYYY HH:mm:ss"
                  onChange={date => this.changeDate(date, "fecha_fin")}
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
export default addReparacion;
