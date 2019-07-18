package com.bytecorp.fablab;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.ResponseBody;

//import com.bytecorp.fablab.MaquinasRepository;

import com.bytecorp.fablab.entity.Trabajos;
import com.bytecorp.fablab.repository.TrabajosRepository;

import java.util.HashMap;
import java.util.Optional;
import org.json.*;
import java.util.Calendar;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/trabajos", produces = "application/json")
public class TrabajosController {
    @Autowired
    private TrabajosRepository trabajosRepository;

    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @PostMapping(path = "/add")
    public @ResponseBody HashMap<String, String> addTrabajo(@RequestParam Integer id_maquina,
            @RequestParam Integer id_encargado, @RequestParam Integer id_solicitante, @RequestParam Integer id_usuario,
            @RequestParam Integer id_material, @RequestParam Integer contexto_uso, @RequestParam String comentarios,
            @RequestParam String fecha_fin, @RequestParam String fecha_inicio) {

        HashMap<String, String> respuesta = new HashMap<String, String>();

        Trabajos n = new Trabajos();

        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");

        Calendar c_inicio = Calendar.getInstance();
        try {
            Date f_inicio = formatter.parse(fecha_inicio);
            c_inicio.setTime(f_inicio);
        } catch (Exception e) {
            respuesta.put("status", "error");
            respuesta.put("message", "Failed to parse fecha_inicio");
            return respuesta;
        }

        Calendar c_fin = Calendar.getInstance();
        try {
            Date f_fin = formatter.parse(fecha_fin);
            c_fin.setTime(f_fin);
        } catch (Exception e) {
            respuesta.put("status", "error");
            respuesta.put("message", "Failed to parse fecha_fin");
            return respuesta;
        }

        n.setMaquina(id_maquina);
        n.setUsuario(id_usuario);
        n.setEncargado(id_encargado);
        n.setSolicitante(id_solicitante);
        n.setMaterial(id_material);
        n.setContexto(contexto_uso);
        n.setComentarios(comentarios);
        n.setInicioTrabajo(c_inicio);
        n.setFinTrabajo(c_fin);
        trabajosRepository.save(n);

        respuesta.put("status", "saved");
        return respuesta;
    }

}
