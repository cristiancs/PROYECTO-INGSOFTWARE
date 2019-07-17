package com.bytecorp.fablab;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.ResponseBody;

import com.bytecorp.fablab.entity.Maquinas;
import com.bytecorp.fablab.repository.MaquinasRepository;

import java.util.HashMap;
import java.util.Optional;
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
    public @ResponseBody HashMap<String, String> addNewMaquina(@RequestParam String nombre, @RequestParam String tipo) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        Maquinas n = new Maquinas();
        n.setNombre(nombre);
        n.setTipo(tipo);
        maquinasRepository.save(n);

        HashMap<String, String> respuesta = new HashMap<String, String>();
        respuesta.put("status", "saved");
        return respuesta;
    }

    @RequestMapping(value = "/edit/{maquinaId}", method = RequestMethod.POST)
    public @ResponseBody HashMap<String, String> EditMaquina(@PathVariable Integer maquinaId,
            @RequestParam String nombre, @RequestParam String tipo) {
        Maquinas n = maquinasRepository.findById(maquinaId)
                .orElseThrow(() -> new IllegalArgumentException("ID not found"));

        if (!nombre.isEmpty()) {
            n.setNombre(nombre);
        }
        if (!tipo.isEmpty()) {
            n.setTipo(tipo);
        }
        maquinasRepository.save(n);

        HashMap<String, String> respuesta = new HashMap<String, String>();
        respuesta.put("status", "Updated");
        return respuesta;
    }

    @RequestMapping(value = "/view/{maquinaId}", method = RequestMethod.POST)
    public @ResponseBody Optional GetMaquina(@PathVariable Integer maquinaId, @RequestParam String nombre,
            @RequestParam String tipo) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        return maquinasRepository.findById(maquinaId);
    }

}
