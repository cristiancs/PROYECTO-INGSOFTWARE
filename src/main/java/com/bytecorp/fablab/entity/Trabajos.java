package com.bytecorp.fablab.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Calendar;

@Entity
public class Trabajos {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer id_maquina;
    private Integer id_encargado;
    private Integer id_solicitante;
    private Integer id_usuario;
    private Integer id_material;
    private Integer contexto_uso;
    private Calendar fecha_fin;
    private Calendar fecha_inicio;
    private String comentarios;

    public Integer getId() {
        return id;
    }

    public Integer getMaquina() {
        return id_maquina;
    }

    public Integer getencargado() {
        return id_encargado;
    }

    public String getComentarios() {
        return comentarios;
    }

    public Calendar getInicioTrabajo() {
        return fecha_inicio;
    }

    public Calendar getFinTrabajo() {
        return fecha_fin;
    }

    public void setMaquina(Integer id_maquina) {
        this.id_maquina = id_maquina;
    }

    public void setEncargado(Integer id_encargado) {
        this.id_encargado = id_encargado;
    }

    public void setSolicitante(Integer id_solicitante) {
        this.id_solicitante = id_solicitante;
    }

    public void setUsuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public void setMaterial(Integer id_material) {
        this.id_material = id_material;
    }

    public void setContexto(Integer contexto_uso) {
        this.contexto_uso = contexto_uso;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }

    public void setInicioTrabajo(Calendar fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public void setFinTrabajo(Calendar fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

}
