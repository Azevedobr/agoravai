package br.itb.projeto.cantina.rest.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;

@RestController
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public ResponseEntity<Map<String, Object>> handleError() {
        Map<String, Object> response = new HashMap<>();
        response.put("error", "Endpoint não encontrado");
        response.put("message", "Verifique a documentação da API");
        response.put("endpoints_disponiveis", Map.of(
            "home", "GET /",
            "usuarios", "GET /usuario/findAll",
            "produtos", "GET /produto/findAll",
            "categorias", "GET /categoria/findAll",
            "pedidos", "GET /pedido/findAll",
            "documentacao", "GET /api/endpoints"
        ));
        return ResponseEntity.ok(response);
    }
}