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

import com.bytecorp.fablab.entity.Mantenciones;
import com.bytecorp.fablab.repository.MantencionesRepository;

import java.util.HashMap;
import java.util.Optional;
import org.json.*;
import java.util.Calendar;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/mantenciones", produces = "application/json")
public class MantencionesController {
    @Autowired
    private MantencionesRepository mantencionesRepository;

    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @PostMapping(path = "/add")
    public @ResponseBody HashMap<String, String> addTrabajo(@RequestParam Integer id_maquina,
            @RequestParam Integer id_usuario, @RequestParam String comentarios, @RequestParam String fecha) {

        HashMap<String, String> respuesta = new HashMap<String, String>();

        Mantenciones n = new Mantenciones();

        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");

        Calendar c_fecha = Calendar.getInstance();
        try {
            Date f_fecha = formatter.parse(fecha);
            c_fecha.setTime(f_fecha);
        } catch (Exception e) {
            respuesta.put("status", "error");
            respuesta.put("message", "Failed to parse fecha");
            return respuesta;
        }

        n.setMaquina(id_maquina);
        n.setUsuario(id_usuario);
        n.setComentarios(comentarios);
        n.setFecha(c_fecha);
        mantencionesRepository.save(n);

        respuesta.put("status", "saved");
        return respuesta;
    }

}
