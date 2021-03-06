package com.bytecorp.fablab.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Calendar;

@Entity
public class Mantenciones {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer id_maquina;
    private Integer id_usuario;
    private String comentarios;
    private Calendar fecha;

    public Integer getId() {
        return id;
    }

    public Integer getMaquina() {
        return id_maquina;
    }

    public Integer getUsuario() {
        return id_usuario;
    }

    public String getComentarios() {
        return comentarios;
    }

    public Calendar getFecha() {
        return fecha;
    }

    public void setMaquina(Integer id_maquina) {
        this.id_maquina = id_maquina;
    }

    public void setUsuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }

    public void setFecha(Calendar fecha) {
        this.fecha = fecha;
    }

}
