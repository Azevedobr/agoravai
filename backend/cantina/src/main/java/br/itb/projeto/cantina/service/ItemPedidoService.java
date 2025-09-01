package br.itb.projeto.cantina.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.itb.projeto.cantina.model.entity.Categoria;
import br.itb.projeto.cantina.model.entity.ItemPedido;
import br.itb.projeto.cantina.model.repository.CategoriaRepository;
import br.itb.projeto.cantina.model.repository.ItemPedidoRepository;

@Service
public class ItemPedidoService {

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    public List<ItemPedido> listarItensPedido() {
        return itemPedidoRepository.findAll();
    }

    public Optional<ItemPedido> buscarItemPedidoPorId(Integer id) {
        return itemPedidoRepository.findById(id);
    }

    public ItemPedido salvarItemPedido(ItemPedido itemPedido) {
        // Você pode adicionar validações/extrair lógica de negócio antes de salvar
        return itemPedidoRepository.save(itemPedido);
    }

    public boolean deletarItemPedido(Integer id) {
        Optional<ItemPedido> itemPedido = itemPedidoRepository.findById(id);
        if (itemPedido.isPresent()) {
            itemPedidoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}