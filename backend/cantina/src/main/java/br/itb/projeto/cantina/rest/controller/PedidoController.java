package br.itb.projeto.cantina.rest.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.cantina.model.entity.Pedido;
import br.itb.projeto.cantina.model.repository.PedidoRepository;

@RestController
@RequestMapping("/pedido")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    // GET: /pedido/findAll
    @GetMapping("/findAll")
    public List<Pedido> getPedidos() {
        return pedidoRepository.findAll();
    }

    // GET: /pedido/create (para teste no navegador)
    @GetMapping("/create")
    public ResponseEntity<String> getCreateForm() {
        return ResponseEntity.ok("Use POST para criar pedido. Exemplo: {\"nomeCliente\":\"João\", \"precoTotal\":25.50}");
    }

    // GET: /api/pedido/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> getPedido(@PathVariable Integer id) {
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        if (pedido.isPresent()) {
            return ResponseEntity.ok(pedido.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST: /pedido/create
    @PostMapping("/create")
    public Pedido createPedido(@RequestBody Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    // PUT: /pedido/aceitar/{id}
    @PutMapping("/aceitar/{id}")
    public ResponseEntity<Pedido> aceitarPedido(@PathVariable Integer id) {
        Optional<Pedido> pedidoExistente = pedidoRepository.findById(id);
        if (pedidoExistente.isPresent()) {
            Pedido pedido = pedidoExistente.get();
            pedido.setStatusPedido("ACEITO");
            // Gerar senha de 4 dígitos
            int senha = 1000 + (int)(Math.random() * 9000);
            String senhaStr = String.valueOf(senha);
            pedido.setSenhaPedido(senhaStr);
            
            // Garantir que dataPedido existe
            if (pedido.getDataPedido() == null) {
                pedido.setDataPedido(java.time.LocalDateTime.now());
            }
            
            Pedido pedidoSalvo = pedidoRepository.save(pedido);
            return ResponseEntity.ok(pedidoSalvo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // PUT: /pedido/cancelar/{id}
    @PutMapping("/cancelar/{id}")
    public ResponseEntity<Pedido> cancelarPedido(@PathVariable Integer id) {
        Optional<Pedido> pedidoExistente = pedidoRepository.findById(id);
        if (pedidoExistente.isPresent()) {
            Pedido pedido = pedidoExistente.get();
            pedido.setStatusPedido("CANCELADO");
            return ResponseEntity.ok(pedidoRepository.save(pedido));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // PUT: /pedido/finalizar/{id}
    @PutMapping("/finalizar/{id}")
    public ResponseEntity<Pedido> finalizarPedido(@PathVariable Integer id) {
        Optional<Pedido> pedidoExistente = pedidoRepository.findById(id);
        if (pedidoExistente.isPresent()) {
            Pedido pedido = pedidoExistente.get();
            pedido.setStatusPedido("FINALIZADO");
            return ResponseEntity.ok(pedidoRepository.save(pedido));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE: /api/pedido/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedido(@PathVariable Integer id) {
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        if (pedido.isPresent()) {
            pedidoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}