package br.itb.projeto.cantina.rest.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ApiController {

    @GetMapping("/endpoints")
    public ResponseEntity<Map<String, Object>> getAllEndpoints() {
        Map<String, Object> endpoints = new HashMap<>();
        
        // Usuários
        endpoints.put("usuarios", Map.of(
            "GET /usuario/findAll", "Listar todos usuários",
            "GET /usuario/findById/{id}", "Buscar usuário por ID",
            "POST /usuario/create", "Criar usuário",
            "POST /usuario/login", "Login usuário",
            "PUT /usuario/editar/{id}", "Editar usuário"
        ));
        
        // Produtos
        endpoints.put("produtos", Map.of(
            "GET /produto/findAll", "Listar todos produtos",
            "GET /produto/findAllCardapio", "Listar cardápio",
            "GET /produto/findById/{id}", "Buscar produto por ID",
            "POST /produto/createSemFoto", "Criar produto sem foto",
            "POST /produto/createComFoto", "Criar produto com foto"
        ));
        
        // Categorias
        endpoints.put("categorias", Map.of(
            "GET /categoria/findAll", "Listar categorias",
            "GET /categoria/findById/{id}", "Buscar categoria por ID",
            "POST /categoria/create", "Criar categoria",
            "PUT /categoria/update/{id}", "Atualizar categoria"
        ));
        
        // Pedidos
        endpoints.put("pedidos", Map.of(
            "GET /pedido/findAll", "Listar pedidos",
            "GET /pedido/findById/{id}", "Buscar pedido por ID",
            "POST /pedido/create", "Criar pedido",
            "PUT /pedido/updateStatus/{id}", "Atualizar status"
        ));
        
        return ResponseEntity.ok(endpoints);
    }

    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> test() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "API funcionando corretamente!");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
}