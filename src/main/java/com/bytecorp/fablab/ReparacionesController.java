package com.bytecorp.fablab;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.ResponseBody;

//import com.bytecorp.fablab.MaquinasRepository;

import com.bytecorp.fablab.entity.Reparaciones;
import com.bytecorp.fablab.repository.ReparacionesRepository;

import java.util.HashMap;
import java.util.Optional;
import org.json.*;
import java.util.Calendar;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller // This means that this class is a Controller
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST })
@RequestMapping(path = "/reparaciones", produces = "application/json")
public class ReparacionesController {
    @Autowired
    private ReparacionesRepository reparacionesRepository;

    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @PostMapping(path = "/add")
    public @ResponseBody HashMap<String, String> addTrabajo(@RequestParam Integer id_maquina,
            @RequestParam Integer id_usuario, @RequestParam Integer estado, @RequestParam String comentarios,
            @RequestParam String fecha_fin, @RequestParam String fecha_inicio) {

        HashMap<String, String> respuesta = new HashMap<String, String>();

        Reparaciones n = new Reparaciones();

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
        n.setEstado(estado);
        n.setComentarios(comentarios);
        n.setInicioTrabajo(c_inicio);
        n.setFinTrabajo(c_fin);
        reparacionesRepository.save(n);

        respuesta.put("status", "saved");
        return respuesta;
    }

}
