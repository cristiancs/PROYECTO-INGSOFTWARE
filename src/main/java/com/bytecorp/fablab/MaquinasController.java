package com.bytecorp.fablab;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bytecorp.fablab.Maquinas;
import com.bytecorp.fablab.MaquinasRepository;

import java.util.Dictionary;
import java.util.HashMap;
import org.json.*;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/maquinas", produces = "application/json")
public class MaquinasController {
    @Autowired
    private MaquinasRepository maquinasRepository;

    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @PostMapping(path = "/add") // Map ONLY GET Requests
    public @ResponseBody HashMap addNewMaquina(@RequestParam String nombre, @RequestParam String tipo) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        Maquinas n = new Maquinas();
        n.setNombre(nombre);
        n.setTipo(tipo);
        maquinasRepository.save(n);

        HashMap respuesta = new HashMap();
        respuesta.put("status", "saved");
        return respuesta;
    }

}
