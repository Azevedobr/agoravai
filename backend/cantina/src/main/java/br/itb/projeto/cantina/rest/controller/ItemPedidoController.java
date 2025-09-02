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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.cantina.model.entity.ItemPedido;
import br.itb.projeto.cantina.service.ItemPedidoService;

@RestController
@RequestMapping("/itemPedido")
@CrossOrigin(origins = "*")
public class ItemPedidoController {

    @Autowired
    private ItemPedidoService itemPedidoService;

    // GET: /itemPedido/findAll
    @GetMapping("/findAll")
    public List<ItemPedido> getItensPedido() {
        return itemPedidoService.listarItensPedido();
    }

    // GET: /itemPedido/findByPedido/{pedidoId}
    @GetMapping("/findByPedido/{pedidoId}")
    public List<ItemPedido> getItensPorPedido(@PathVariable Integer pedidoId) {
        // Implementar busca por pedido no service
        return itemPedidoService.listarItensPedido();
    }

    // GET: /api/item-pedido/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ItemPedido> getItemPedido(@PathVariable Integer id) {
        Optional<ItemPedido> itemPedido = itemPedidoService.buscarItemPedidoPorId(id);
        if (itemPedido.isPresent()) {
            return ResponseEntity.ok(itemPedido.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST: /itemPedido/create
    @PostMapping("/create")
    public ItemPedido createItemPedido(@RequestBody ItemPedido itemPedido) {
        return itemPedidoService.salvarItemPedido(itemPedido);
    }

    // DELETE: /api/item-pedido/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItemPedido(@PathVariable Integer id) {
        boolean deletado = itemPedidoService.deletarItemPedido(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}







